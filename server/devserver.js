var WebpackDevServer = require("webpack-dev-server");
var config = require("./../webpack.config.js");
//config.entry.unshift("webpack-dev-server/client?http://localhost:8080/");
var webpack = require("webpack");

module.exports = function() {
    var bundleStart = null;
    var compiler = webpack(config);
    compiler.plugin('compile', function() {
        console.log('Bundling...');
        bundleStart = Date.now();
    });

    // We also give notice when it is done compiling, including the
    // time it took. Nice to have
    compiler.plugin('done', function() {
        console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
    });


    var server = new WebpackDevServer(compiler, {
        publicPath: '/build/',

        // Configure hot replacement
        hot: true,

        // The rest is terminal configurations
        quiet: false,
        noInfo: false,
        stats: {
            assets: true,
            colors: true,
            version: true,
            hash: true,
            timings: true,
            chunks: true,
            chunkModules: true
        }
    });

   server.listen(8080, "localhost", function () {
        console.log("Development server listening on port 8080");
    });
}