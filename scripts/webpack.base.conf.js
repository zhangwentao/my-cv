const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
       index: path.resolve(__dirname,'../src/index.js'),
       exp: path.resolve(__dirname,'../src/exp.js')
    },
    output: {
        path: path.resolve(__dirname,'../docs/'),
        filename: '[name]-[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.png$/,
                use: [
                    {
                       loader:'url-loader',
                    }
                ]
            },
            {
                test: /\.ico$/,
                use: [
                    {
                       loader:'file-loader',
                       options: {
                           name: '[name]-[hash].[ext]'
                       }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/tpl.html',
            favicon: 'src/assets/icon.ico',
            title: '张文韬的简历',
            chunks: ['index'],
            filename: 'index.html',
            minify: {
                collapseWhitespace: true
            } 
        }),
        new HtmlWebpackPlugin({
            template: 'src/tpl.html',
            favicon: 'src/assets/icon.ico',
            title: '张文韬的项目经历',
            chunks: ['exp'],
            filename: 'exp.html',
            minify: {
                collapseWhitespace: true
            } 
        })
    ]
};