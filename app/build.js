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

function mkdirs(location) {
	let normalizedPath = path.normalize(location);
	let parsedPathObj = path.parse(normalizedPath);
	let curDir = parsedPathObj.root;
	let folders = parsedPathObj.dir.split(path.sep);
	folders.push(parsedPathObj.base);
	for(let part of folders) {
		curDir = path.join(curDir, part);
		if (!fs.existsSync(curDir)) {
			fs.mkdirSync(curDir);
		}
	}
}

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

function simpleLibUpdate(url, dir, name) {
	http.get(url, response => {
		response.pipe(fs.createWriteStream(dir+"/"+name)).on("error", (err) => {
			console.error(err);
		});
	});
}

function unpkgLibUpdate(url, dir, name) {
	http.get(url, response => {
		response.on("data", (data) => {
			url = "http://unpkg.com"+data.toString().substring(22);
			simpleLibUpdate(url, dir, name);
		});
	});
}

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

simpleLibUpdate("http://cdn.jsdelivr.net/npm/vue", "app/src/js/lib", "vue.min.js");
unpkgLibUpdate("http://unpkg.com/vue-router/dist/vue-router.js", "app/src/js/lib", "vue-router.js");

unpkgLibUpdate("http://unpkg.com/ipfs-api/dist/index.js", "app/src/js/lib", "ipfs-api.js");
simpleLibUpdate("http://cdn.jsdelivr.net/gh/ethereum/web3.js/dist/web3.min.js", "app/src/js/lib", "web3.min.js");

fs.copyFileSync("node_modules/jquery/dist/jquery.min.js", "app/src/js/lib/jquery.min.js");
//fs.copyFileSync("node_modules/pug/runtime.js", "app/src/js/lib/pug.js");

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
	if (!fs.existsSync(outPathP.dir)) {
		mkdirs(outPathP.dir);
	}

	if (file.match(".*components\\\\.*\\\\.*\\.pug")) {
		outPath+=".js";
		console.log("Compiling "+file);

		let js = pug.compileClient("span lol", {
			name: inPath.dir.substring(16, inPath.dir.lastIndexOf(path.sep)-1)
		});

		console.log(eval(js));

		console.log("Writing to "+outPath);
		fs.readFile(path.join(inPath.dir, inPath.name+".base.js"), (err, data) => {
			let text = js+"\n\n"+data.toString();
			fs.writeFileSync(outPath, text);
			fs.unlinkSync(path.join(outPathP.dir, inPath.name+".base.js"));
		});
	} else if (file.match(".*\\.pug")) {
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
exports.mkdirs = mkdirs;