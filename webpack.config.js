const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require("webpack");

module.exports = (env, options) => ({
    entry: {
        "index": path.resolve(__dirname, "./src/app.ts")
    },
    output: {
        filename: "./js/[name].min.js",
        path: path.resolve(__dirname + "/dist"),
        library: "ELog",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    devtool: "source-map",
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: { comments: false }
                }
            })
        ]
    },
    devServer: {
        overlay: {
            errors: true,
            warnings: true
        },
        quiet: true,
        noInfo: true,
        clientLogLevel: "none"
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            },
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html"
        }),
        new webpack.DefinePlugin({
            isDev: options.mode !== "production"
        }),
        new webpack.ProvidePlugin({
            dl: [ path.resolve(__dirname, "./lib/DevLogger"), "default" ]
        })
    ]
});