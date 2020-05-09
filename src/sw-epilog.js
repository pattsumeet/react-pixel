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
        if (url.pathname == "/pixel") {
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