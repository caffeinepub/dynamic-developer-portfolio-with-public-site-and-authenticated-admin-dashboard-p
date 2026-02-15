# Specification

## Summary
**Goal:** Add a new public “Create” page to showcase work and services, drive client contact/hiring, and display clearly labeled advertisement placement placeholders.

**Planned changes:**
- Add a new public route `/create` (CreatePage) under the existing PublicLayout with English-only page copy.
- Build CreatePage sections: hero/intro, Featured Work (reusing existing project cards/data or a subset), Services/“What I can do for you”, a primary CTA linking to `/contact`, and an Advertisements section with responsive labeled placeholder ad blocks (e.g., banner and square units) with no third-party ad integrations.
- Add a “Create” link to the public navigation (desktop + mobile) with correct active-route styling.
- Update route-aware SEO mapping to include `/create` with an appropriate English title, description, and OG image entry.
- Add `/create` to the static sitemap (`frontend/public/sitemap.xml`) using the existing sitemap style.

**User-visible outcome:** Users can navigate to `/create` from the public navbar to view a new Create page featuring showcased work, services, a clear contact/hire CTA, and visible ad-space placeholders; the page is responsive, themed consistently (including dark mode), and discoverable via SEO and sitemap.
