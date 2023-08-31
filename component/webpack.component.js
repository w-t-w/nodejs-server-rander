const path = require('path');

const OUTPUT_DIR = path.resolve(process.cwd(), './component/build');

/**
 * webpack component config
 * @type {{}}
 */
const componentConfig = {
    mode: 'production',
    target: 'web',
    entry: {
        component_index: './component/page/index.js'
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

module.exports = componentConfig;