import { skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { createProxyServer } from 'ipfs-postmsg-proxy';
import IPFS from 'ipfs';

const sw = self as unknown as ServiceWorkerGlobalScope;
const maniest = (self as any).__WB_MANIFEST;

let node;

async function startIPFS(opts) {
	node = await IPFS.create({
		EXPERIMENTAL: {
			pubsub: true
		},
		config: {
			Addresses: {
				Swarm: [
					// '/ip4/127.0.0.1/tcp/13579/wss/p2p-webrtc-star'
				]
			}
		},
		...opts
	});

	await node.swarm.connect('/ip4/127.0.0.1/tcp/4002/ws/p2p/QmP7kf4teMVJBZiDMgtMJFUQCtZGstaKpjdDsCvQprRSdd');

	console.log('js-ipfs node is ready');

	async function catAndRespond(hash) {
		const chunks: Buffer[] = [];
		for await (const chunk of node.cat(hash)) {
			chunks.push(chunk);
		}

		return new Response(Buffer.concat(chunks), { status: 200, statusText: 'OK', headers: {} });
	}

	registerRoute(/\/ipfs\/.*/, ({ url }) => {
		return catAndRespond(url?.toString().split('/ipfs/')[1]);
	});

	createProxyServer(() => node, {
		addListener: sw.addEventListener.bind(sw),
		removeListener: sw.removeEventListener.bind(sw),
		async postMessage(data) {
			// TODO: post back to the client that sent the message?
			const clients = await sw.clients.matchAll();
			clients.forEach(client => client.postMessage(data));
		}
	});
}

skipWaiting();
clientsClaim();

sw.addEventListener('message', async (msg) => {
	console.log(msg.data);

	if (msg.data === 'ipfs.start' || msg.data.action === 'ipfs.start') {
		await startIPFS(msg.data.options || {});
		(msg as any).source.postMessage((msg.data.action || msg.data) + '.reply');
	}
});

if (process.env.NODE_ENV === 'production') {
	precacheAndRoute(maniest);

	// precacheAndRoute([
	// 	'js/chunk-vendors.js'
	// ]);

	registerRoute(new NavigationRoute(createHandlerBoundToURL('/index.html'), {
		denylist: [
			/\/ipfs\/.*/
		]
	}));
}
