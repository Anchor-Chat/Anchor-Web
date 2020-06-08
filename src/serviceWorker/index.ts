/* eslint-disable no-console */

// if (process.env.NODE_ENV === 'production') {
// register(`${process.env.BASE_URL}sw.js`, {
// 	ready() {
// 		console.log(
// 			'App is being served from cache by a service worker.\n' +
// 			'For more details, visit https://goo.gl/AFskqB'
// 		);

// 		const node = createProxyClient({
// 			addListener: navigator.serviceWorker.addEventListener.bind(navigator.serviceWorker),
// 			removeListener: navigator.serviceWorker.removeEventListener.bind(navigator.serviceWorker),
// 			postMessage: (data) => (navigator.serviceWorker.controller || {} as any).postMessage(data)
// 		})
// 	},
// 	registered() {
// 		console.log('Service worker has been registered.');
// 	},
// 	cached() {
// 		console.log('Content has been cached for offline use.');
// 	},
// 	updatefound() {
// 		console.log('New content is downloading.');
// 	},
// 	updated() {
// 		console.log('New content is available; please refresh.');
// 	},
// 	offline() {
// 		console.log('No internet connection found. App is running in offline mode.');
// 	},
// 	error(error) {
// 		console.error('Error during service worker registration:', error);
// 	}
// });
// }

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register(`${process.env.BASE_URL}sw.js`)
		.then(reg => {
			console.log('Service Worker Registered');
		}).catch(console.error);
}
