require('webpack');
var HtmlPlugin = require('html-webpack-plugin');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');

var path = require('path');
var localIdentName = '[path]__[local]___[hash:base64:5]';

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'src/index.[hash].js'
    },
    resolve: {

        // Autoresolved extensions
        extensions: ['.js', '.jsx'],

        // Absolute import path priorities
        modules: [
            './src',
            './stv-utils-frontend',
            './node_modules'
        ]
    },
    module: {

        // INFO: look into `stv-utils-frontend` webpack setup if extra rules need to be applied
        rules: [

            // Run eslint
            { enforce: 'pre', test: /\.jsx?$/, loader: 'eslint-loader', exclude: /node_modules/ },

            // Hot-reload
            { test: /\.(jsx?|scss)?$/, exclude: /node_modules/, loader: 'react-hot-loader' },

            // Global styles
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
                exclude: /src\/components/,

            },

            // Component styles
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    'css-loader?modules&importLoaders=1&localIdentName=' + localIdentName,
                    'sass-loader',
                ],
                include: /src\/components/,
            },

            // Fonts
            { test: /\.[ot]tf$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },

            // Images
            { test: /\.png$/, loader: 'url-loader' },

            // Javascript
            {
                test: /\.jsx?$/,
                exclude: [
                    /node_modules/,
                    /stv\-utils\-frontend/,
                ],
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-1'],
                    plugins: [
                        'transform-decorators-legacy', // XXX: Must be first
                        'transform-class-properties',
                        'jsx-control-statements',
                        ['react-css-modules', {
                            "generateScopedName": localIdentName,
                            "filetypes": {
                                ".scss": "postcss-scss"
                            }
                        }]
                    ],
                }
            }
        ]
    },
    plugins: [
        new HtmlPlugin({
            hash: true,
            title: 'SignSpace',
            template: './src/html/index.html',
            inject: 'body',
        })
    ]
};
