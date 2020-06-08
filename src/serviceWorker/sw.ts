import { skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute, matchPrecache, createHandlerBoundToURL } from 'workbox-precaching';
import { setDefaultHandler, registerRoute, NavigationRoute } from 'workbox-routing';
import { createProxyServer } from 'ipfs-postmsg-proxy';
import IPFS from 'ipfs';

const sw = self as unknown as ServiceWorkerGlobalScope;
const maniest = (self as any).__WB_MANIFEST;

let node;

skipWaiting();
clientsClaim();

self.addEventListener('activate', (event) => {
	console.log('activate step');

	node = new IPFS({
		config: {
			Addresses: {
				Swarm: [
					'/ip4/127.0.0.1/tcp/13579/wss/p2p-webrtc-star'
				]
			}
		}
	});
	node.on('ready', () => console.log('js-ipfs node is ready'));
	node.on('error', (err) => console.log('js-ipfs node errored', err));
});

async function catAndRespond(hash) {
	const data = await node.files.cat(hash);
	const headers = { status: 200, statusText: 'OK', headers: {} };
	return new Response(data, headers);
}

registerRoute(/\/ipfs\/.*/, async ({ url }) => {
	return catAndRespond((url || '').toString().split('/ipfs/')[1]);
});

if (process.env.NODE_ENV === 'production') {
	precacheAndRoute(maniest);

	precacheAndRoute([
		'js/chunk-vendors.js'
	]);
}

registerRoute(new NavigationRoute(createHandlerBoundToURL('/index.html'), {
	denylist: [
		/\/ipfs\/.*/
	]
}));

// if (process.env.NODE_ENV === 'production') {
// setDefaultHandler(async ({ url, request, event, params }) => {
// 	const res = await matchPrecache(request);
// 	const f = await fetch(request, { cache: 'no-cache' });

// 	return (process.env.NODE_ENV === 'development' ? null : res) || f.ok ? f : fetch('index.html');
// });
// }

// if (process.env.NODE_ENV === 'production') {
// 	setDefaultHandler(() => {
// 		return fetch('index.html');
// 	});
// }
