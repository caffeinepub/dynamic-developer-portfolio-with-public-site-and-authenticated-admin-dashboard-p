# Specification

## Summary
**Goal:** Show a clear loading indicator while an authenticated admin logout request is in progress.

**Planned changes:**
- Add a dedicated `logoutPending` (or equivalent) boolean to the admin session hook that is true only while the logout action is pending.
- Update the AdminLayout header Logout button to use the logout pending flag to: (1) switch to a loading presentation (spinner + “Logging out...”), and (2) disable the button until logout completes.
- Ensure repeated clicks during the pending state do not trigger multiple logout requests, and that after logout finishes the UI transitions to the unauthenticated admin experience without remaining in a loading state.

**User-visible outcome:** When an admin clicks Logout, the button immediately shows a disabled “Logging out...” loader until logout completes, then the admin is returned to the unauthenticated (login/guard) experience.
