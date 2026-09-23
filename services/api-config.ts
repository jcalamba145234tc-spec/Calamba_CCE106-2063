const baseUrl = (process.env.EXPO_PUBLIC_API_URL ?? "").replace(/\/$/, "");

export const API_CONFIG = {
  baseUrl,
  loginUrl: process.env.EXPO_PUBLIC_LOGIN_URL || (baseUrl ? `${baseUrl}/auth/login` : ""),
  profileUrl: process.env.EXPO_PUBLIC_PROFILE_URL || (baseUrl ? `${baseUrl}/auth/me` : ""),
  quoteUrl: process.env.EXPO_PUBLIC_QUOTE_API_URL || "https://dummyjson.com/quotes/random",
};
