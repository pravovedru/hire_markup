'use strict';

let debug = process.env.NODE_ENV !== 'production' && process.argv.indexOf('--env.production') < 0;
console.log('Debug: ' + (debug ? 'enabled, use --env.production to disable' : 'disabled'));

let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let ImageminPlugin = require('imagemin-webpack-plugin').default;
let imageminJpegRecompress = require('imagemin-jpeg-recompress');
let imageminAdvpng = require('imagemin-advpng');


let extractSass =  new ExtractTextPlugin({ filename: 'css/[name].css' });
var copyImages = new CopyWebpackPlugin([{ from: 'img/', to: 'img/' }]);
var minImages = new ImageminPlugin({
    test: /\.(jpe?g|png|gif|svg)$/i,
    jpegtran: null,
    optipng: null,
    plugins: [
        imageminJpegRecompress({
            progressive: true,
            min: 65,
            max: 75
        }),
        imageminAdvpng({
            optimizationLevel: 4
        })
    ]
});
let copyHtml = new CopyWebpackPlugin([{
    from: './*.html'
}]);

module.exports = [{
    context: __dirname + '/src',
    entry: {
        main: './scss/main.scss'
    },
    output: {
        path: __dirname + '/build',
        filename: 'css/[name].css'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        url: false,
                        minimize: !debug
                    }
                }, {
                    loader: 'sass-loader'
                }, {
                    loader: 'autoprefixer-loader',
                    options: {
                        browsers: ['last 3 versions']
                    }
                }],
                fallback: 'style-loader'
            })
        }]
    },
    plugins: [
        extractSass,
        copyImages,
        minImages,
        copyHtml
    ],
    stats: {
        children: false
    }
}];