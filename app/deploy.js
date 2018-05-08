let opts = require("./build");

const { spawnSync } = require("child_process");

const fs = require("fs");

//const github = require("octonode");

const IPFSFactory = require("ipfsd-ctl");
let ipfsd = IPFSFactory.create();
let ipfsNode;

let files = opts.walkSync(opts.out);

//gh_deploy(files);

console.log("Deploying to IPFS");
console.log("Starting an IPFS node");
ipfsd.spawn({disposable: false, repoPath: "~/.ipfs"}, (err, ipfsNodee) => {
	if (err) throw err;

	ipfsNode = ipfsNodee;
	console.log("Starting the IPFS daemon");

	ipfsNode.init((err) => {
		if (err) throw err;

		ipfsNode.start((err, ipfs) => {
			if (err) throw err;
	
			console.log("The daemon is up and running!");
			console.log("Adding files to IPFS...");
	
			let add = spawnSync("node_modules/go-ipfs-dep/go-ipfs/ipfs", ["add", "-r", opts.out]);
	
			let stdout = add.stdout.toString().split("\n");
			stdout = stdout.slice(0, stdout.length-1);
	
			console.log(stdout);
	
			let hash = stdout[stdout.length-1].substring(6, 52);
	
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
				console.log("Generating the key...");
				ipfs.key.gen(name, {
					type: "rsa",
					size: 2048
				}, (err, key) => {callback(err, key);});
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

	ipfs.name.publish(hash, { key: key.name }, (err, name) => {
		if (err) throw err;

		console.log("The published IPNS name is: "+name.name);
		console.log("and it resolves to: "+name.value);

		callback();
	});	
}

// function gh_deploy(files) {
// 	process.env.GH_TOKEN="";
// 	if (process.env.GH_TOKEN) {
// 		console.log("Deploying to Github");

// 		let client = github.client(process.env.GH_TOKEN);

// 		console.log("Compressing compiled web sources");
// 		zip.add("build/web/web-compiled.7z", files)
// 			.progress((f) => {
// 				console.log("Compressing...");
// 			})
// 			.then(err => {
// 				if (err) throw err;
// 				let repo = client.repo(opts.repoSlug);
		
// 				repo.releases(rel => {
// 					if (rel[0].tag_name == opts.version) {

// 					} else {
// 						repo.
// 					}
// 				});
// 			}).catch((err) => { console.error(err); });

// 	} 
// }