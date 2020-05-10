/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "/react-pixel/precache-manifest.33bebdc5dc9610db0aed7642ed86096a.js"
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/react-pixel/index.html"), {
  
  blacklist: [/^\/_/,/\/[^\/?]+\.[^\/]+$/],
});
console.log('WORKER: executing custom service worker.');

const CACHE_NAME = 'web-app-cache';

const rootDir = 'https://ssurabhi-in.github.io/service-worker/';

const urlsToCache = [
    rootDir,
    `${rootDir}css/global.css`,
    `${rootDir}images/pixel.gif`,
];

const reqParams = {
    interaction: 'event',
    client: 'customer',
    os_name: 'operating_system_name',
    x1: 'utm_source',
    x2: 'utm_medium',
    x3: 'utm_campaign',
    landing_url: 'campaign_url'
}


self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
          if(key !== CACHE_NAME) {
            return caches.delete(key);
          }
        }));
      })
    );
  });

self.addEventListener("fetch", function(event) {
    console.log('WORKER: fetch event in progress.');
    if (event.request.method !== 'GET') {
      console.log('WORKER: fetch event ignored.', event.request.method, event.request.url);
      return;
    }

    const url = new URL(event.request.url);

    // console.log(url.pathname);
    // console.log(url.origin);
    // console.log(location.origin);
    // console.log(url);
    
    let newURL = url.origin+url.pathname+'?';
    const urlParams = new URLSearchParams(url.search);
    let keys = urlParams.keys();
        for(key of keys) { 
            // console.log(reqParams[key]);
        newURL = newURL + reqParams[key]+ '=' + urlParams.get(key) + '&'
        }
    
    let lastChar = newURL[newURL.length -1];
    if (lastChar == '&') {
        newURL = newURL.substring(0, newURL.length-1);
    }
    // console.log(url.pathname);
    console.log(newURL);


    // if (url.origin == location.origin && url.pathname == "/images/pixel.gif") {
        // console.log(url.pathname);
        if (url.pathname == "/pixel.gif") {
            console.log('inside pixel');

            // event.respondWith(
            //     caches.match(event.request).then(function(response) {
            //       return response || fetch(newURL);
            //     })
            //   );

            event.respondWith(
                fetch(newURL).catch(function() {
                  return caches.match(event.request);
                })
              );
      }
  });