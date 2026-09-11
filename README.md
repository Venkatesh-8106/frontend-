# CampusPass frontend

React + Vite frontend module for the College Digital Permission & Approval Platform.

## Run locally

```bash
npm install
npm run dev
```

The app is available at `http://localhost:5173/`.

## Configuration

Create a `.env` file when the API is hosted outside the Vite origin:

```env
VITE_API_BASE_URL=https://your-api.example.com/api
```

When unset, requests use `/api`, which works with a same-origin proxy or backend.

During local Vite development, if no API base URL is configured and `/api` returns `404`, the app uses a small local demo store so the auth and user-edit flows can be previewed without a backend. Set `VITE_API_BASE_URL` to disable this fallback and use your real API.

`AuthService.js` stores the JWT under `campuspass_token` and the returned user under `campuspass_user` in localStorage. For production deployments, prefer an httpOnly, secure, same-site cookie by moving token persistence to the backend session layer.

## Tab styling tokens

Workspace tabs use a 46px minimum height, `px-5 py-2` spacing, `gap-x-2` icon alignment, and `rounded-lg` corners. Active tabs use the `teal` brand token with white bold text; inactive tabs use muted ink with a subtle teal hover background. Desktop tabs sit in the left rail and stack vertically; mobile tabs remain full-width and stacked.

## API contracts

- `POST /auth/login` accepts `{ email, password }` and returns `{ token, user: { id, name, role } }`.
- `POST /auth/register` accepts `{ name, email, password, role, college, department, section }`.
- `PUT /admin/users/:id` accepts `{ email, phone }` and requires `Authorization: Bearer <token>`.

## Git workflow

Create a feature branch such as `feature/ui-auth-user-management`, pull the latest `main` before starting a sprint, and open a pull request for review before merging. Keep commits small and descriptive, for example:

```text
feat(ui): add login/register/user management
```
