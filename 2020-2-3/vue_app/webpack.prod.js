const commonConfig = require('./webpack.common'),
    merge = require('webpack-merge'),
    webpack = require('webpack'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'),
    path = require('path'),

    cssConfig = [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader'
    ],

    prodConfig = {
        mode: 'production',
        devtool: 'cheap-module-eval-source-map',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].[contentpath].js',
            chunkFilename: '[name].[contentpath].js',
        },

        module: {
            rules: [
                {
                    test: /\.vue$/, //打包字体
                    use: {
                        loader: 'vue-loader',
                        // options: {
                        //     loaders: {
                        //         css: cssConfig,
                        //         less: lessConfig,
                        //     }
                        // }
                    }
                },
                {
                    test: /\.css/,
                    use: cssConfig
                },
                {
                    test: /\.less/,
                    loader: "style-loader!css-loader!less-loader",
                    // use: lessConfig
                }
            ]
        },

        optimization: {
            minimizer: [new OptimizeCssAssetsWebpackPlugin({})],
            runtimeChunk: {
                name: 'manifest'
            },
            splitChunks: {
                chunks: 'all', //配置了all就是相当于配置了下面的默认配置
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        filename: 'vendors.js',
                    },
                    // default: false
                }
                // minSize: 30000,
                // maxSize: 0,
                // minChunks: 1,
                // maxAsyncRequests: 5,
                // maxInitialRequests: 3,
                // automaticNameDelimiter: '~',
                // name: true,
            },

        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].chunk.css'
            }),
        ]

    };

module.exports = merge(prodConfig, commonConfig);