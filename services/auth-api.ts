import { Platform } from "react-native";
import { API_CONFIG } from "./api-config";

export type Student = {
  id?: string | number;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  studentId?: string | number;
  program?: string;
  yearLevel?: string | number;
};

const TOKEN_KEY = "student_portal_access_token";
const DEMO_TOKEN_PREFIX = "local-demo-session:";
export const DEMO_CREDENTIALS = {
  email: "student@calamba.edu.ph",
  password: "Student123!",
};
const DEMO_PROFILE: Student = {
  id: "STU-1001",
  studentId: "STU-1001",
  name: "Jake Calamba",
  firstName: "Jake",
  lastName: "Calamba",
  email: DEMO_CREDENTIALS.email,
  role: "Student",
  program: "BS Information Technology",
  yearLevel: "3rd Year",
};

export function isDemoLoginEnabled() {
  return __DEV__;
}

export class ApiError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = "ApiError";
  }
}

async function secureStore() {
  if (Platform.OS === "web") {
    throw new Error("Secure sign-in is available in the iOS and Android app. Web token storage is not enabled.");
  }
  const store = await import("expo-secure-store");
  if (!(await store.isAvailableAsync())) throw new Error("Secure storage is unavailable on this device.");
  return store;
}

export async function saveToken(token: string) {
  if (!token.trim()) throw new Error("The server did not provide an access token.");
  try {
    const store = await secureStore();
    await store.setItemAsync(TOKEN_KEY, token);
  } catch (error) {
    throw new Error(`Could not securely save the session: ${messageOf(error)}`);
  }
}

export async function readToken() {
  try {
    const store = await secureStore();
    return await store.getItemAsync(TOKEN_KEY);
  } catch (error) {
    throw new Error(`Could not restore the session: ${messageOf(error)}`);
  }
}

export async function clearToken() {
  try {
    const store = await secureStore();
    await store.deleteItemAsync(TOKEN_KEY);
  } catch (error) {
    throw new Error(`Could not clear the saved session: ${messageOf(error)}`);
  }
}

export async function loginRequest(email: string, password: string) {
  if (
    isDemoLoginEnabled() &&
    email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
    password === DEMO_CREDENTIALS.password
  ) {
    const sessionId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    return { token: `${DEMO_TOKEN_PREFIX}${sessionId}`, user: { ...DEMO_PROFILE } };
  }
  if (!API_CONFIG.loginUrl) {
    throw new Error("Authentication is not configured. Set EXPO_PUBLIC_API_URL or EXPO_PUBLIC_LOGIN_URL.");
  }
  const response = await fetch(API_CONFIG.loginUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const body = await parseResponse(response, "Invalid email or password.");
  const data = record(body.data) ?? body;
  const token = data.access_token ?? data.accessToken ?? data.token;
  if (typeof token !== "string" || !token.trim()) {
    throw new Error("The login response did not contain an access_token, accessToken, or token field.");
  }
  return { token, user: asStudent(data.user ?? body.user) };
}

export async function profileRequest(token: string): Promise<Student | null> {
  if (!token.trim()) throw new Error("No access token is available for the profile request.");
  if (isDemoLoginEnabled() && token.startsWith(DEMO_TOKEN_PREFIX)) return { ...DEMO_PROFILE };
  if (!API_CONFIG.profileUrl) {
    throw new Error("The profile endpoint is not configured. Set EXPO_PUBLIC_API_URL or EXPO_PUBLIC_PROFILE_URL.");
  }
  const response = await fetch(API_CONFIG.profileUrl, {
    method: "GET",
    headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
  });
  const body = await parseResponse(response, "Your session has expired. Please log in again.");
  const data = record(body.data) ?? body;
  const profile = asStudent(data.user ?? data.profile ?? data);
  return profile && Object.keys(profile).length ? profile : null;
}

export async function updateProfileRequest(token: string, names: { firstName: string; lastName: string }): Promise<Student> {
  if (!token.trim()) throw new Error("No access token is available for the profile request.");
  if (isDemoLoginEnabled() && token.startsWith(DEMO_TOKEN_PREFIX)) {
    return { ...names, name: `${names.firstName} ${names.lastName}`.trim() };
  }
  if (!API_CONFIG.profileUrl) throw new Error("The profile endpoint is not configured.");
  const name = `${names.firstName} ${names.lastName}`.trim();
  const response = await fetch(API_CONFIG.profileUrl, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ ...names, name }),
  });
  const body = await parseResponse(response, "Your session has expired. Please log in again.");
  const data = record(body.data) ?? body;
  return { ...names, name, ...(asStudent(data.user ?? data.profile ?? data) ?? {}) };
}

async function parseResponse(response: Response, unauthorizedMessage: string): Promise<Record<string, unknown>> {
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    if (response.ok) throw new Error("The server returned an invalid JSON response.");
    body = null;
  }

  const data = record(body);
  if (response.status === 401) throw new ApiError(unauthorizedMessage, 401);
  if (response.status === 403) throw new ApiError("You are not authorized to access this resource.", 403);
  if (!response.ok) {
    const message = data?.message ?? data?.error;
    throw new ApiError(typeof message === "string" ? message : `Request failed (${response.status}).`, response.status);
  }
  if (!data) throw new Error("The server returned an empty or invalid JSON response.");
  return data;
}

function record(value: unknown): Record<string, any> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as Record<string, any>
    : null;
}

function asStudent(value: unknown): Student | null {
  const result = record(value);
  return result ? result as Student : null;
}

export function messageOf(error: unknown) {
  return error instanceof Error ? error.message : "An unexpected error occurred.";
}
