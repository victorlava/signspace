require('webpack');
var webpackConfig = require('./webpack.config.base');

webpackConfig.devServer = {
    proxy: {
        '/api/v1/**': {
            target: process.env.SERVER,
            changeOrigin: true,
            logLevel: 'debug',
        }
    },
};

module.exports = webpackConfig;
