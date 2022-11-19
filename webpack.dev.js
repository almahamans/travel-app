const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/client/index.js',
    output: {
        libraryTarget: 'var',
        library: 'Client',
    },
    mode: 'development',
    // https://webpack.js.org/configuration/dev-server/#devserverproxy
    devServer: {
        proxy: {
            '/geonames-locations': 'http://localhost:3000',
            '/weatherbit-forecast': 'http://localhost:3000',
            '/pixabay-images': 'http://localhost:3000',
            '/saveTrip': 'http://localhost:3000',
            '/getSaveTrip': 'http://localhost:3000',
            '/removeSavedTrip': 'http://localhost:3000',
            '/searchTrip': 'http://localhost:3000',
            '/getSearchTrip': 'http://localhost:3000',
        },
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: '/.js$/',
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                exclude: ['/node_modules/', require.resolve('./src/client/index.js')], //Refer to SO page that discusses file-loader/HTML WP plugin conflicts
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'imgs',
                        publicPath: 'imgs'
                    }
                }
            }
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html',
        }),
        new WriteFilePlugin(),
        // new CopyPlugin({
        //     patterns: [
        //         { from: 'src/client/icons', to: 'icons' },
        //         { from: 'src/client/images', to: 'images' },
        //     ],
        // }),
        //new Dotenv(),
        new CleanWebpackPlugin({
            dry: false,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false,
        })
    ],
};