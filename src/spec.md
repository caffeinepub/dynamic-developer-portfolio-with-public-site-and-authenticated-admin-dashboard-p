# Specification

## Summary
**Goal:** Simplify admin authentication/authorization to a single-admin session model and remove role/permission assignment errors during login and admin operations.

**Planned changes:**
- Backend: Update admin auth to assume one admin user authenticated via the existing email/password session only, with no role/permission assignment step during login.
- Backend: Replace current `AccessControl.hasPermission(... #admin)` protections on admin-only methods with a single-admin-session check (active, not expired), and trap with a consistent human-readable "Unauthorized" error for unauthenticated/expired callers.
- Frontend: Ensure Admin Login displays a clear, user-friendly error when `createAdminSession` fails, and avoid showing misleading role/permission assignment messaging.

**User-visible outcome:** Admin can log in using `admin@gmail.com` / `Admin@92505` without role/permission-related errors, is correctly redirected on success, and sees a clear login error on failure; admin-only actions are accessible only with a valid, unexpired admin session and otherwise return an "Unauthorized" error.
