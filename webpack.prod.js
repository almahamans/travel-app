const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const WorkboxPlugin = require('workbox-webpack-plugin')
const fileLoader = require('file-loader')
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: './src/client/index.js',
    output: {
        libraryTarget: 'var',
        library: 'Client',
    },
    mode: 'production',
    optimization: {
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserPlugin()
            ],
    },
    module: {
        rules: [
            {
                test: '/.js$/',
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                exclude: ['/node_modules/', require.resolve('./src/client/index.js')], 
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
            filename: './index.html'
        }),
        // new CopyPlugin({
        //     patterns: [
        //         { from: 'src/client/icons', to: 'icons' },
        //         { from: 'src/client/images', to: 'images' },
        //     ],
        // }),
        new CleanWebpackPlugin({
            dry: false,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false,
        }),
        //new Dotenv(),
        new WorkboxPlugin.GenerateSW(),
        //new MiniCssExtractPlugin({ filename: '[name].css' }),
        new MiniCssExtractPlugin()
    ],
};