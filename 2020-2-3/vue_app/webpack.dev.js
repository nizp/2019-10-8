const HtmlWebpackPlugin = require('html-webpack-plugin'),
    {CleanWebpackPlugin} = require('clean-webpack-plugin'),
    path = require('path'),
    cssConfig = [ 'style-loader', 'css-loader' ],
    VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {

    entry: {
        filename: './src/main.js'
    },

    module: {
        rules: [
            {
                test: /\.vue$/, //打包字体
                use: {
                    loader: 'vue-loader'
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
            },
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
    devServer: {
        contentBase: path.join(__dirname, "./dist"),
        compress: true,
        port: 3000,
        hot: true,
        open: true
    }
};