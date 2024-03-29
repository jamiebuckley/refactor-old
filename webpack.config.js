var failPlugin = require('webpack-fail-plugin');

module.exports = {
    entry: [
        "./client/src/main.tsx"],
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
        publicPath: "http://localhost:8080/assets/",
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"] },
            { test: /\.css$/, loaders: ["style-loader", "css-loader"]},
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    plugins: [
        failPlugin
    ]
};