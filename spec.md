# Specification

## Summary
**Goal:** Replace the static PNG QR code on the `/qr` page with a dynamic, styled `QRCode` React component built on the `qr-code-styling` npm library.

**Planned changes:**
- Create a new `QRCode` component at `frontend/src/components/shared-assets/QRCode.tsx` using the `qr-code-styling` library, accepting `value`, `size` (`sm`/`md`/`lg` → 160/256/384px), and optional `options` props (image, dotsOptions, cornersSquareOptions, cornersDotOptions), rendering via `append()` and re-rendering on prop changes.
- Update `frontend/src/pages/QrPage.tsx` to replace the static `<img>` QR code with the new `<QRCode>` component, encoding the portfolio URL, using `size="lg"`, and applying portfolio-themed colored dots and corner squares.
- Retain existing instruction text, fallback anchor link, and noindex SEO behavior on the `/qr` page.

**User-visible outcome:** The `/qr` page now displays a visually styled, dynamically generated QR code (with colored dots and corners matching the portfolio theme) instead of a static image.
