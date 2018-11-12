const cachedFiles = [
	"/",
	"/index.html",
	"/restaurant.html",
	'/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

// returns all cached files upon load
self.addEventListener("install", function(event) {
	event.waitUntil(
			caches.open("v1.0")
			.then(function(cache) {
				return cache.addAll(cachedFiles);
			})
	)
});

// make a promise on fetch if it doesn't already exist
self.addEventListener("fetch", function(event) {
	event.respondWith(
		caches.match(event.request)
		.then(function(resp){
			if (resp) {
				// if the request has been found, return it
				return resp;
			} else {
				// if it hasn't, fetch/new promise and add to caches
				return fetch(event.request)
				.then(function(resp) {
					let clonedResp = resp.clone();
					caches.open("v1.0")
					.then(function(cache) {
						cache.put(event.request, clonedResp);
					})
					return resp;
				})
			}
		})
	)
});