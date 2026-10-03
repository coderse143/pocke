/* Pocké service worker: keeps the app working offline. Change VERSION to force an update. */
const VERSION = "pocke-v1";
const FONTS = VERSION + "-fonts";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon.svg", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION && k !== FONTS).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    // App files: answer from the cache at once, refresh the cache in the background.
    e.respondWith(
      caches.match(req, { ignoreSearch: true }).then((hit) => {
        const net = fetch(req)
          .then((res) => {
            if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
            return res;
          })
          .catch(() => hit || caches.match("./index.html"));
        return hit || net;
      })
    );
  } else if (/(^|\.)fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    // Fonts: keep a copy after the first online visit.
    e.respondWith(
      caches.open(FONTS).then((c) =>
        c.match(req).then((hit) =>
          hit || fetch(req).then((res) => { c.put(req, res.clone()); return res; }).catch(() => hit)
        )
      )
    );
  }
});
