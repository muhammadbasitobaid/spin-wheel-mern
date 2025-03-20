const CACHE_VERSION = "v2";
const CACHE_NAME = `spinner-wheel-${CACHE_VERSION}`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/manifest.json",
        // Add other static assets you want to cache
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Special handling for sitemap.xml
  if (url.pathname === "/sitemap.xml") {
    event.respondWith(
      fetch(event.request).catch(() => {
        // If fetch fails, return a proper XML response
        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://thespinnerwheel.com/</loc>
    <lastmod>2025-03-19</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://thespinnerwheel.com/yes-or-no-wheel</loc>
    <lastmod>2025-03-19</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://thespinnerwheel.com/random-number-generator</loc>
    <lastmod>2025-03-19</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://thespinnerwheel.com/random-letter-generator</loc>
    <lastmod>2025-03-19</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`,
          {
            headers: {
              "Content-Type": "application/xml",
              "X-Robots-Tag": "noindex, nofollow"
            },
          }
        );
      })
    );
    return;
  }

  // Cache-first strategy for other requests
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
}); 