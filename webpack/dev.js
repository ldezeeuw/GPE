const path              = require('path');
const webpack           = require('webpack');
const moment            = require('moment');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin    = require('uglifyjs-webpack-plugin');

const BUILD_DIR         = path.resolve(__dirname, './../dist');
const SRC_DIR           = path.resolve(__dirname, './../src');
const APP_DIR           = path.resolve(__dirname, './../src/app');
const MODULES_DIR       = path.resolve(__dirname, './../node_modules');

module.exports = env => {
    let plugins = [
        new HtmlWebpackPlugin({title: 'Caching and Code Splitting', template: APP_DIR + '/index.html'}),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({minChunks: ({resource}) => /node_modules/.test(resource), name:'vendor', filename: 'vendor.[chunkhash].js'}),
        new webpack.optimize.CommonsChunkPlugin({name:'manifest'}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV'      : JSON.stringify("development"), 
            'process.env.PLATFORM_ENV'  : JSON.stringify("web"), 
            'process.env.BABEL_ENV'     : JSON.stringify("development"),
            'process.env.SANDBOX'       : JSON.stringify(env.sandbox),
            'process.env.BUILD_DATE'    : JSON.stringify(moment().format('DD/MM HH:mm:ss'))
        })
    ];

    return {
        devServer: {
            historyApiFallback: true
        },
        entry: {
            app: APP_DIR +'/index.js'
        },
        output: {
            path: BUILD_DIR,
            publicPath: '/',
            chunkFilename: '[name].[chunkhash].js',
            filename: '[name].[chunkhash].js'
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            modules: [APP_DIR, MODULES_DIR]
        },
        module: {
            rules: [{
                test: /\.js?$/,
                exclude: /node_modules/,
                include : SRC_DIR,
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.less$/,
                use: ['style-loader','css-loader',"less-loader"]
            }, {
                test: /\.json$/,
                use: "json-loader"
            }]
        },
        plugins
    }
}