module.exports = class WebpackOnBuildPLugin {

	constructor(fun) {
		this.fun = fun;
	}

	apply(compiler) {
		compiler.hooks.compile.tap("WebackOnBuildPlugin", compilation => {
			console.log("On Compile Hook!");
			this.fun(compilation);
		});
	}
}