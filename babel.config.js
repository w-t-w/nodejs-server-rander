/**
 * babel-loader: @babel/preset-env 与 @babel/preset-react 的配置
 * @type {{presets: ([string,{loose: boolean, useBuiltIns: string, corejs: {proposal: boolean, version: number}, modules: boolean}]|[string,{runtime: string}])[], sourceType: string}}
 */
const babelConfig = {
    sourceType: 'unambiguous',
    presets: [[
        '@babel/preset-env',
        {
            useBuiltIns: 'usage',
            modules: false,
            loose: false,
            corejs: {
                version: 3,
                proposal: true
            }
        }
    ], [
        '@babel/preset-react',
        {
            runtime: 'automatic'
        }
    ]]
};

module.exports = babelConfig;