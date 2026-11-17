import { useEffect } from 'react';

/**
 * Dynamically updates document.title and <meta> tags in <head> based on CMS pageData
 */
export function usePageSeo(pageData, fallbackTitle = 'Griffin Construction', fallbackDesc = '') {
  useEffect(() => {
    if (!pageData) return;

    // 1. Browser Tab / SEO Title
    const title =
      pageData.seoTitle ||
      pageData.seo_title ||
      pageData.heading ||
      pageData.title ||
      fallbackTitle;
    const finalTitle = title.toLowerCase().includes('griffin') ? title : `${title} | Griffin Construction`;
    document.title = finalTitle;

    // Helper to update or create a <meta> tag
    const setMetaTag = (attributeName, attributeValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attributeName, attributeValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to update or create a <link> tag
    const setLinkTag = (rel, href) => {
      if (!href) return;
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // 2. Meta Description
    const description =
      pageData.seoDescription ||
      pageData.seo_description ||
      pageData.description ||
      pageData.subtitle ||
      fallbackDesc;
    if (description) {
      setMetaTag('name', 'description', description);
      setMetaTag('property', 'og:description', description);
      setMetaTag('name', 'twitter:description', description);
    }

    // 3. Open Graph Title
    setMetaTag('property', 'og:title', finalTitle);
    setMetaTag('name', 'twitter:title', finalTitle);

    // 4. Open Graph Image
    const ogImage =
      pageData.ogImage ||
      pageData.og_image ||
      pageData.heroImage ||
      pageData.hero_image ||
      '/favicon.png';
    if (ogImage) {
      const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`;
      setMetaTag('property', 'og:image', fullImageUrl);
      setMetaTag('name', 'twitter:image', fullImageUrl);
    }

    // 5. Robots indexing
    const allowIndex =
      pageData.robotsIndex !== false && pageData.robots_index !== false && pageData.published !== false;
    setMetaTag('name', 'robots', allowIndex ? 'index, follow' : 'noindex, nofollow');

    // 6. Canonical URL
    const canonical = pageData.canonicalUrl || pageData.canonical_url || window.location.href;
    setLinkTag('canonical', canonical);
  }, [pageData, fallbackTitle, fallbackDesc]);
}

export default usePageSeo;
