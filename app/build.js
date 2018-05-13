const pug = require("pug");
const gv = require("genversion");

const os = require("os");
const fs = require("fs");
const path = require("path");
const http = require("http");

const src = path.join("app", "src");
const out = path.join("build", "web");
const repoSlug = "Decentracord/Decentracord-Web";
const repoPath = path.join(os.homedir(), ".ipfs");

const walkSync = (dir, filelist = []) => {
	fs.readdirSync(dir).forEach(file => {
  
		filelist = fs.statSync(path.join(dir, file)).isDirectory()
			? walkSync(path.join(dir, file), filelist)
			: filelist.concat(path.join(dir, file));
  
	});
	return filelist;
};

let rmdirSync = (path) => {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach((file) => {
			let curPath = path + "/" + file;
			if (fs.lstatSync(curPath).isDirectory()) { // recurse
				rmdirSync(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
};

if (fs.existsSync(out)) {
	console.log("Prebuild cleanup");
	rmdirSync(out);
}

console.log("Build start");
if (!fs.existsSync("build")) {
	fs.mkdirSync("build");
}
fs.mkdirSync(out);

console.log("Updating local libraries...");
http.get("http://unpkg.com/ipfs-api/dist/index.js", response => {
	response.on("data", (data) => {
		let url = "http://unpkg.com"+data.toString().substring(22);
		http.get(url, response => {
			response.pipe(fs.createWriteStream("app/src/js/lib/ipfs-api.js")).on("error", (err) => {
				console.error(err);
			});
		});
	});
});

http.get("http://cdn.jsdelivr.net/gh/ethereum/web3.js/dist/web3.min.js", response => {
	response.pipe(fs.createWriteStream("app/src/js/lib/web3.min.js")).on("error", (err) => {
		console.error(err);
	});
});

fs.copyFileSync("node_modules/jquery/dist/jquery.min.js", "app/src/js/lib/jquery.min.js");

console.log("Genversion");
gv.check("lib/version.js", (err, doesExist, isByGenversion) => {
	if (err) throw err;

	if (!doesExist || (doesExist && isByGenversion)) {
		gv.generate("lib/version.js", { useSemicolon: true }, (err , version) => {
			if (err) throw err;
			exports.version = version;
		});
	}
});

let files = walkSync(src);

files.forEach(file => {

	let inPath = path.parse(file);
	let outPath = path.join(out, inPath.dir.substring(src.length), inPath.name);
	let outPathP = path.parse(outPath);

	let grandParent = path.parse(outPathP.dir).dir;
	if (!fs.existsSync(grandParent)) {
		fs.mkdirSync(grandParent);
	}
	if (!fs.existsSync(outPathP.dir)) {
		fs.mkdirSync(outPathP.dir);
	}

	if (file.match(".*\\.pug")) {
		outPath+=".html";
		console.log("Rendering "+file);
		let html = pug.renderFile(file);

		console.log("Writing to "+outPath);

		fs.writeFileSync(outPath, html);
	} else {
		outPath+=inPath.ext;

		console.log("Copying "+file+" to "+outPath);
		// fs.lstat(file, (err, stat) => {
		// 	if (stat.isDirectory()) {
		// 		ncp(file, out+"/"+p.base);
		// 	} else {
		// 		fs.copyFileSync(file, out+"/"+p.base);
		// 	}
		// });
		fs.copyFileSync(file, outPath);
	}
});
console.log("Build Done!");

exports.out = out;
exports.src = src;
exports.walkSync = walkSync;
exports.repoSlug = repoSlug;
exports.repoPath = repoPath;