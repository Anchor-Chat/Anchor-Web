const dev = require("./webpack.dev.js");
const path = require("path");

module.exports = dev;
module.exports.output.path = path.resolve(__dirname, "preview");