# Specification

## Summary
**Goal:** Fix admin login so that successful email/password authentication redirects to the correct admin destination and updates authenticated state consistently across the admin UI without requiring a reload.

**Planned changes:**
- Update admin login flow to navigate to the originally requested admin route when present, otherwise default to `/admin` after successful login.
- Ensure admin session/auth state propagates consistently across components using `useAdminSession()` / `useAdminGuard()` so the admin layout/guard reflects `isAuthenticated === true` immediately after login.
- Confirm invalid credentials keep the user on the login form with an inline error, and logout clears session state so the admin area returns to the login form on next render.

**User-visible outcome:** After a successful admin login, the app redirects away from the login form to the admin dashboard (`/admin`) or the originally requested admin page (e.g. `/admin/projects`), and authentication state updates immediately across the admin area without a full page refresh.
