"use strict";

const webpack = require('webpack');

const config = {
    context: `${__dirname}/src`,
    resolve: {
        extensions: ['','.ts','.js']
    },

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin()
    ],

    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts' }
        ]
    }
};

module.exports = config;