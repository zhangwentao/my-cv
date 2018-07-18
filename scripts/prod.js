const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const baseConf = require('./webpack.base.conf');

var conf = merge(baseConf,{
    mode: 'production',
    optimization: {
        minimizer: [
          new UglifyJsPlugin({ /* your config */ }),
          new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new CleanWebpackPlugin('docs',{
            root: path.resolve(__dirname,'../'),
            exclude: ['CNAME']
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name]-[hash].css",
            chunkFilename: "[id].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      // you can specify a publicPath here
                      // by default it use publicPath in webpackOptions.output
                    }
                  },
                  "css-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      // you can specify a publicPath here
                      // by default it use publicPath in webpackOptions.output
                    }
                  },
                  "css-loader",
                  "less-loader"
                ]
            },
            {
                test: /\.md$/,
                use: [
                    'html-loader',
                    {
                        loader: 'markdown-loader',
                        options: {
                            headerIds: false
                        }
                    }
                ]
            }
        ]
    } ,
});

var compiler = webpack(conf);

compiler.run((err,stats) => {
    if(err) {
        console.log(err);
    } else {
        process.stdout.write(stats.toString({
            colors: true,
        }) + '\n\n');
    }
});