const path = require('path');

const OUTPUT_DIR = path.resolve(process.cwd(), './backend/build');

/**
 * webpack ssr config
 * @type {{}}
 */
const ssrConfig = {
    mode: 'production',
    target: 'node',
    entry: {
        ssr_index: './backend/page/index.js'
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
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }]
        }]
    }
};

module.exports = ssrConfig;