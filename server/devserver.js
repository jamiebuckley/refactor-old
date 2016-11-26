var WebpackDevServer = require("webpack-dev-server");
var config = require("./../webpack.config.js");
var webpack = require("webpack");

module.exports = function() {
    var bundleStart = null;
    var compiler = webpack(config);
    compiler.plugin('compile', function() {
        console.log('Bundling...');
        bundleStart = Date.now();
    });

    compiler.plugin('done', function() {
        console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
    });


    var server = new WebpackDevServer(compiler, {
        publicPath: 'http://localhost:8080/assets/',
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
        },
        watchOptions: {
            aggregateTimeout: 1000,
            poll: 1000
        },
    });

   server.listen(8080, "localhost", function () {
        console.log("Development server listening on port 8080");
    });
}