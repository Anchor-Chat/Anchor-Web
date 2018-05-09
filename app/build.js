const pug = require("pug");
const gv = require("genversion");

const os = require("os");
const fs = require("fs");
const path = require("path");

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