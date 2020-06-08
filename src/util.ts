export function postMsgAndWait(target: Window | ServiceWorker, message: any) {
	return new Promise((resolve) => {
		(target as any).postMessage(message);

		const callback = (reply) => {
			target.removeEventListener('message', callback);

			const rp = (message.action || message) + '.reply';

			if ((reply.action && reply.action === rp) || reply === rp) {
				resolve(reply);
			}
		};

		target.addEventListener('message', callback);
	});
}
