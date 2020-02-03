const HtmlWebpackPlugin = require('html-webpack-plugin'),
    {CleanWebpackPlugin} = require('clean-webpack-plugin'),
    path = require('path'),
    VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {

    entry: {
        filename: './src/main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]_[hash].[ext]',
                            outputPath: 'image/',
                            limit: 10240
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|svg)$/, //打包字体
                use: {
                    loader: 'file-loader',
                }
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),

        new CleanWebpackPlugin(),

        new VueLoaderPlugin()
    ],

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js'
    }
};