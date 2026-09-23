import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ApiError, clearToken, loginRequest, messageOf, profileRequest, readToken, saveToken, type Student, updateProfileRequest } from "../services/auth-api";

type AuthValue = {
  status: "checking" | "signedOut" | "signedIn";
  user: Student | null;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateName: (firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
};
const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [status, setStatus] = useState<AuthValue["status"]>("checking");
  const [user, setUser] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);

  const expireSession = useCallback(async () => {
    setUser(null);
    setStatus("signedOut");
    try { await clearToken(); } catch { /* Keep the app signed out even if storage is unavailable. */ }
  }, []);

  useEffect(() => {
    let active = true;
    void (async () => {
      let hasToken = false;
      try {
        const token = await readToken();
        if (!token) {
          if (active) setStatus("signedOut");
          return;
        }
        hasToken = true;
        const profile = await profileRequest(token);
        if (active) { setUser(profile); setStatus("signedIn"); }
      } catch (requestError) {
        if (!active) return;
        if (requestError instanceof ApiError && requestError.status === 401) {
          try { await clearToken(); } catch { /* Continue to the logged-out state. */ }
          setUser(null);
          setStatus("signedOut");
          setError(requestError.message);
        } else {
          // A 403 or temporary network failure does not prove that the token is invalid.
          setUser(null);
          setStatus(hasToken ? "signedIn" : "signedOut");
          setError(messageOf(requestError));
        }
      }
    })();
    return () => { active = false; };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setError(null);
    try {
      const result = await loginRequest(email, password);
      await saveToken(result.token);
      setUser(result.user ?? null);
      setStatus("signedIn");
      try {
        const profile = await profileRequest(result.token);
        setUser(profile ?? result.user ?? null);
      } catch (profileError) {
        if (profileError instanceof ApiError && profileError.status === 401) {
          await expireSession();
          throw profileError;
        }
        setError(messageOf(profileError));
      }
    } catch (requestError) {
      if (status !== "signedIn") {
        setUser(null);
        setStatus("signedOut");
        setError(messageOf(requestError));
      }
      throw requestError;
    }
  }, [expireSession, status]);

  const refreshProfile = useCallback(async () => {
    setError(null);
    try {
      const token = await readToken();
      if (!token) {
        await expireSession();
        setError("Your session has expired. Please log in again.");
        return;
      }
      const profile = await profileRequest(token);
      setUser(profile);
      if (!profile) setError("No student information is available.");
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 401) {
        await expireSession();
      }
      setError(messageOf(requestError));
      throw requestError;
    }
  }, [expireSession]);

  const logout = useCallback(async () => {
    setError(null);
    setUser(null);
    setStatus("signedOut");
    try { await clearToken(); } catch (storageError) { setError(messageOf(storageError)); }
  }, []);

  const updateName = useCallback(async (firstName: string, lastName: string) => {
    setError(null);
    try {
      const token = await readToken();
      if (!token) {
        await expireSession();
        throw new Error("Your session has expired. Please log in again.");
      }
      const updated = await updateProfileRequest(token, { firstName, lastName });
      setUser((current) => current ? { ...current, ...updated } : updated);
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 401) await expireSession();
      setError(messageOf(requestError));
      throw requestError;
    }
  }, [expireSession]);

  const clearError = useCallback(() => setError(null), []);
  const value = useMemo(() => ({ status, user, error, login, refreshProfile, logout, updateName, clearError }), [status, user, error, login, refreshProfile, logout, updateName, clearError]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
