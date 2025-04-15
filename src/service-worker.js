import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';

clientsClaim();
precacheAndRoute(self.__WB_MANIFEST || []);

registerRoute(
  ({ request, url }) => {
    // Only handle navigation requests
    if (request.mode !== 'navigate') return false;

    // Skip special routes (like Next.js/_app or APIs)
    if (url.pathname.startsWith('/_')) return false;

    // Skip requests that contain file extensions (e.g., .js, .css, .png)
    return !url.pathname.match(/\/[^/?]+\.[^/]+$/);
  },
  createHandlerBoundToURL(`${process.env.PUBLIC_URL || ''}/index.html`)
);

// Listen to skipWaiting messages for immediate activation
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
