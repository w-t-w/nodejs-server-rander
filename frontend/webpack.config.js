const path = require('path');

const OUTPUT_DIR = path.resolve(process.cwd(), './source/static');

/**
 * webpack config
 * @type {{mode: string, output: {chunkFilename: string, path: string, filename: string, library: {type: string}, publicPath: string}, entry: {web_index: string}, stats: {preset: string}, module: {rules: [{test: RegExp, use: [{loader: string, options: {cacheDirectory: boolean}}]}]}, target: string}}
 */
const webpackConfig = {
    mode: 'production',
    target: 'web',
    entry: {
        web_index: './frontend/page/index.js'
    },
    output: {
        path: OUTPUT_DIR,
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].js',
        library: {
            type: 'umd'
        }
    },
    stats: {
        preset: 'minimal'
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }]
        }]
    }
};

module.exports = webpackConfig;