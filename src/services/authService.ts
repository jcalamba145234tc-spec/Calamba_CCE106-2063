const BASE_URL = 'https://dummyjson.com';

export type UserProfile = {
  id?: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  image?: string;
};

type LoginResponse = {
  accessToken: string;
};

export async function loginUser(username: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, expiresInMins: 30 }),
  });

  if (!response.ok) {
    throw new Error('LOGIN_FAILED');
  }

  return (await response.json()) as LoginResponse;
}

export async function getCurrentUser(token: string): Promise<UserProfile> {
  const response = await fetch(`${BASE_URL}/auth/me`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(response.status === 401 || response.status === 403 ? 'AUTH_PROFILE_FAILED' : 'PROFILE_LOAD_FAILED');
  }

  return (await response.json()) as UserProfile;
}
