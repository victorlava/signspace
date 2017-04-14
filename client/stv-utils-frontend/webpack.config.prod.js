const Webpack = require('webpack');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/lib.js',
    output: {
        filename: 'index.js',
        path: './lib/',
        library: "StvUtilisFrontend",
        libraryTarget: 'commonjs2',
    },
    externals: {
        "jquery": "jquery",
        "react": "react",
        "react-dom": "react-dom"
    },
    plugins: [
        new Webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('common.scss'),
        new CopyWebpackPlugin([
            {
                from: './src/commonCss/theme-1.vars.scss',
                to: './'
            },
            {
                from: './src/commonCss/theme-2.vars.scss',
                to: './'
            },
            {
                from: './src/commonCss/_variables.scss',
                to: './'
            }
        ])

    ],
    resolveLoader: {
        moduleExtensions: ["-loader"]
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader' },
            { test: /\.jsx$/, loader: 'babel-loader' },
            { test: /\.json$/, loader: 'json' },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('css-loader?minimize=false!postcss-loader') },
            { test: /\.png$/, loader: 'url-loader' },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.[ot]tf?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
            { test: /\.(eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    }
};
