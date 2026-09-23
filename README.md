# Calamba Student Portal

An Expo SDK 54 app with an authenticated student portal and a protected Quotes screen. Native authentication tokens are stored with `expo-secure-store`.

## Configure the student API

Copy `.env.example` to `.env`. The provided Postman mock is set as `EXPO_PUBLIC_API_URL`; the app currently expects these paths on that host:

- `POST /auth/login` with `{ "email": "...", "password": "..." }`
- `GET /auth/me` with `Authorization: Bearer <token>`
- `PATCH /auth/me` with `Authorization: Bearer <token>` and `{ "firstName": "...", "lastName": "...", "name": "..." }` to save profile name edits

The login response must include a token as `access_token`, `accessToken`, or `token`, either at the top level or inside `data`. The profile endpoint can return a profile object directly, inside `user`, or inside `data`. The profile may include `name` or `firstName`/`lastName`, `email`, `role`, `studentId`, `program`, and `yearLevel`.

The Postman collection's routes and response examples could not be read from the shared workspace page. If its login or profile paths differ, set `EXPO_PUBLIC_LOGIN_URL` and `EXPO_PUBLIC_PROFILE_URL` to the full request URLs. API response handling is in `services/auth-api.ts`.

For development, the local demo account is `student@calamba.edu.ph` / `Student123!`. It uses a local demo profile instead of calling the Postman API and is disabled in production builds. Use backend credentials to test real API authentication.

## Run

```sh
npm install
npx expo start
```

The app restores the secure token at launch, validates it by requesting `/auth/me`, and protects the app routes until the session is known. Logging out clears secure storage and app state.

## Quotes app

After sign-in, the Student Profile screen loads a quote automatically, and the Quotes tab provides the same section. It fetches from `EXPO_PUBLIC_QUOTE_API_URL` (defaults to `https://dummyjson.com/quotes/random`), validates the JSON `quote` and `author` fields, and displays loading, error, and empty states. Press **New Quote** to make another request. Copy `.env.example` to `.env` to override the quote endpoint.

The other student portal tabs remain available after a valid session is restored or created. Secure token storage uses Expo SecureStore on iOS and Android; secure sign-in is disabled on web.
