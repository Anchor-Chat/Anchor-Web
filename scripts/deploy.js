const { spawnSync } = require("child_process");

const path = require("path");
const fs = require("fs");
const os = require("os");

const IPFSFactory = require("ipfsd-ctl");
let ipfsd = IPFSFactory.create();
let ipfsNode;

const ipfsApiUtils = require("ipfs-api-utils");

const out = "./dist";
const repoPath = path.join(os.homedir(), ".ipfs");

if (process.env.TRAVIS_PULL_REQUEST != "false") process.exit(0);

console.log("Deploying to IPFS");
console.log("Starting an IPFS node");
ipfsd.spawn({disposable: false, repoPath: repoPath}, (err, ipfsNodee) => {
	if (err) throw err;

	ipfsNode = ipfsNodee;
	console.log("Starting the IPFS daemon");

	isIPFSInitialized(repoPath, (callback) => {
		ipfsNode.init((err) => {
			if (err) throw err;
			callback();
		});
	}, () => {

		ipfsNode.start((err, ipfs) => {
			if (err) throw err;
			ipfsApiUtils(ipfs, repoPath);

			console.log("The daemon is up and running!");
			console.log("Adding files to IPFS...");
	
			let add = spawnSync("node_modules/go-ipfs-dep/go-ipfs/ipfs", ["add", "-r", out]);
	
			let stdout = add.stdout.toString();
			stdout = stdout.substring(0, stdout.lastIndexOf("\n"));

			let stdoutArr = stdout.split("\n");
	
			console.log(stdout);

			let hash = stdoutArr[stdoutArr.length-1].substring(6, 52);
	
			publishIPNS(ipfs, hash, () => {
				console.log("Cleaning up...");
				ipfsNode.stop((err) => {
					if (err) throw err;
					ipfsNode.cleanup((err) => {
						if (err) throw err;
						console.log("Done!");
						process.exit();
					});
				});
			});
	
		});

	});

});

let checkedForKey = false;

function genKey(ipfs, name, callback) {
	if (!checkedForKey) {
		checkedForKey = true;

		ipfs.key.list((err, keys) => {
			if (err) throw err;
			let exists = false;

			keys.forEach((key => {
				if (key.name == name) {
					exists = true;
				}
			}));
			
			if (!exists) {
				if (!process.env.IPFS_KEY_HASH) {
					console.log("Generating the key...");
					ipfs.key.gen(name, {
						type: "rsa",
						size: 2048
					}, callback);
				} else {
					console.log("Importing the key from the IPFS hash provided in the $IPFS_KEY_HASH env var");
					ipfs.files.get(process.env.IPFS_KEY_HASH, (err, files) => {
						if (err) throw err;
						let buffer = files[0].content;
						ipfs.utils.importKey(name, buffer, callback);
					});
				}
			} else {
				callback(err, {name: name});
			}

		});
	} else {
		callback(undefined, {name: name});
	}
}

function publishIPNS(ipfs, hash, callback) {
	genKey(ipfs, "decentracord", (err, key) => {
		if (err) throw err;
		
		pub(ipfs, hash, key, callback);
	});
}

function pub(ipfs, hash, key, callback) {
	console.log("Publishing the IPNS name...");

	setTimeout(() => {
		ipfs.swarm.peers((err, peerInfos) => {
			//console.log(peerInfos);
	
			ipfs.name.publish(hash, { key: key.name }, (err, name) => {
				if (err) {
					console.error(err);
				} else {
					console.log("The published IPNS name is: "+name.name);
					console.log("and it resolves to: "+name.value);
					console.log("Public ipns url: https://gateway.ipfs.io/ipns/"+name.name);
					console.log("Public ipfs url: https://gateway.ipfs.io"+name.value);
				}
				callback();
			});	
		});
	}, 1000);

}

/**
 * 
 * @param {string} repoPath 
 * @param {function} ifNot 
 * @param {function} callback 
 */
function isIPFSInitialized(repoPath, ifNot, callback) {
	fs.exists(path.join(repoPath, "config").replace("~", require("os").homedir()), (exists) => {
		if (exists) {
			callback();
		} else {
			ifNot(callback);
		}
	});
}