/* eslint-disable no-restricted-globals */

import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST || []);

registerRoute(
  ({ request, url }) => {
    if (request.mode !== 'navigate') return false;
    if (url.pathname.startsWith('/_')) return false;
    return !url.pathname.match(/\/[^/?]+\.[^/]+$/);
  },
  createHandlerBoundToURL(`${process.env.PUBLIC_URL || ''}/index.html`)
);

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
