const CACHE_NAME = "v1_cache_contador_App_Vue"
const urlsToCache = [
    "./",
    "./img/ico32.png",
    "./img/ico64.png",
    "./img/ico128.png",
    "./img/ico256.png",
    "./img/ico512.png",
    "./js/main.js",
    "https://unpkg.com/vue@next",
    "./js/mountApp.js",
    "./css/style.css",
    "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css",
    "https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
]
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(
            cache => cache.addAll(urlsToCache).then(
                () => self.skipWaiting()
            ).catch(
                err => console.log(err)
            )
        )
    )
})

self.addEventListener("activate", e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys().then(
            cacheNames => {
                return Promise.all(
                    cacheNames.map(
                        cacheName => {
                            if (cacheWhitelist.indexOf(cacheName) == -1) {
                                return caches.delete(cacheName)
                            }
                        }
                    )
                )
            }
        ).then(
            () => self.clients.claim()
        )
    )
})

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(
            res => {
                if (res) {
                    return res
                }
                return fetch(e.request)
            }
        )
    )
})