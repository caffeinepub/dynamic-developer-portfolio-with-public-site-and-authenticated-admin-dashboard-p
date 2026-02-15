import { useEffect } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { getSeoForRoute } from './routeSeo';
import { generateCombinedStructuredData } from './structuredData';

export default function SeoHeadManager() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const isAdminRoute = pathname.startsWith('/admin');

  useEffect(() => {
    const origin = window.location.origin;
    const canonicalUrl = `${origin}${pathname}`;

    // Update document title
    if (isAdminRoute) {
      document.title = 'Admin Panel - Bajrangi Yadav Portfolio';
    } else {
      const seoConfig = getSeoForRoute(pathname);
      document.title = seoConfig.title;
    }

    // Helper to set or update meta tag
    const setMetaTag = (selector: string, attribute: string, content: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        if (selector.includes('name=')) {
          element.setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] || '');
        } else if (selector.includes('property=')) {
          element.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] || '');
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, content);
    };

    // Helper to set or update link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Helper to remove meta tag
    const removeMetaTag = (selector: string) => {
      const element = document.querySelector(selector);
      if (element) {
        element.remove();
      }
    };

    // Helper to manage JSON-LD script
    const setJsonLd = (data: object | null) => {
      // Remove existing JSON-LD
      const existing = document.querySelector('script[type="application/ld+json"]');
      if (existing) {
        existing.remove();
      }

      // Add new JSON-LD if data provided
      if (data) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
      }
    };

    if (isAdminRoute) {
      // Admin routes: noindex, nofollow
      setMetaTag('meta[name="robots"]', 'content', 'noindex, nofollow');
      
      // Remove public SEO tags
      removeMetaTag('meta[name="description"]');
      removeMetaTag('meta[property="og:title"]');
      removeMetaTag('meta[property="og:description"]');
      removeMetaTag('meta[property="og:url"]');
      removeMetaTag('meta[property="og:type"]');
      removeMetaTag('meta[property="og:image"]');
      removeMetaTag('meta[name="twitter:card"]');
      removeMetaTag('meta[name="twitter:title"]');
      removeMetaTag('meta[name="twitter:description"]');
      removeMetaTag('meta[name="twitter:image"]');
      
      // Remove canonical and JSON-LD
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.remove();
      }
      setJsonLd(null);
    } else {
      // Public routes: remove noindex if present
      removeMetaTag('meta[name="robots"]');

      const seoConfig = getSeoForRoute(pathname);
      const ogImageUrl = `${origin}${seoConfig.ogImage}`;

      // Set meta description
      setMetaTag('meta[name="description"]', 'content', seoConfig.description);

      // Set canonical link
      setLinkTag('canonical', canonicalUrl);

      // Set Open Graph tags
      setMetaTag('meta[property="og:title"]', 'content', seoConfig.title);
      setMetaTag('meta[property="og:description"]', 'content', seoConfig.description);
      setMetaTag('meta[property="og:url"]', 'content', canonicalUrl);
      setMetaTag('meta[property="og:type"]', 'content', 'website');
      setMetaTag('meta[property="og:image"]', 'content', ogImageUrl);

      // Set Twitter Card tags
      setMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
      setMetaTag('meta[name="twitter:title"]', 'content', seoConfig.title);
      setMetaTag('meta[name="twitter:description"]', 'content', seoConfig.description);
      setMetaTag('meta[name="twitter:image"]', 'content', ogImageUrl);

      // Set JSON-LD structured data
      const structuredData = generateCombinedStructuredData({
        url: origin,
        pathname,
      });
      setJsonLd(structuredData);
    }
  }, [pathname, isAdminRoute]);

  return null;
}
