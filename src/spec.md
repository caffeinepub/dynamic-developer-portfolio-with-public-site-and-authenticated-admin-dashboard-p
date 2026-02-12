# Specification

## Summary
**Goal:** Update the Home page hero typing animation to include “Debugger” in the word rotation.

**Planned changes:**
- Update `typingWords` in `frontend/src/pages/HomePage.tsx` to exactly: `['Developer','Designer','Database','Debugger','DevOps']` (in that order).
- Ensure the Home hero headline remains “Full-Stack” followed by the animated typing word, cycling through the updated list without runtime errors.

**User-visible outcome:** The Home page hero typing animation now cycles through Developer, Designer, Database, Debugger, and DevOps after “Full-Stack”.
