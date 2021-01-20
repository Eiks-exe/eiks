const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier');

const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'
const ASSET_PATH = process.env.ASSET_PATH || './dist/'

module.exports = {
    entry: {
        index :[
            './src/index.js',
            './src/style.scss'
        ],
    },
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css",
            chunkFilename: "1.css"
        }),


        new WebpackNotifierPlugin(),
    ],
    optimization: {
        minimize: isProduction,
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false,
                        annotation: true,
                    }
                }
            }),

        ]
    }
};
