const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
       index: path.resolve(__dirname,'../src/index.js')
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
            title: 'resume',
            template: 'src/tpl.html',
            favicon: 'src/assets/icon.ico',
            minify: {
                collapseWhitespace: true
            } 
        })
    ]
};