# Specification

## Summary
**Goal:** Add simple utility pages for QR sharing and scanning that route users to the public portfolio URL.

**Planned changes:**
- Add a new public route `/scan` that shows a brief English “redirecting” message and immediately performs a client-side redirect to `https://dynamic-developer-portfolio-with-public-site-and-a-w6e.caffeine.xyz/`.
- Add a new public route `/qr` that displays a static QR code image encoding `https://dynamic-developer-portfolio-with-public-site-and-a-w6e.caffeine.xyz/`, along with short English instructions and the readable destination URL.
- Ensure `/scan` and `/qr` set `meta[name="robots"]` to `noindex, nofollow` via the existing route-aware SEO head behavior.

**User-visible outcome:** Users can visit `/qr` to scan a QR code to open the portfolio, and visiting `/scan` will automatically redirect them to the portfolio while showing a short “Redirecting to portfolio…” message.
