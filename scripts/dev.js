const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackDevServer = require('webpack-dev-server');

const baseConf = require('./webpack.base.conf');

const conf = merge(baseConf,{
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
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
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});

const serverConf = {
    hot: true,
    host: '0.0.0.0',
    port: '1234'
}

WebpackDevServer.addDevServerEntrypoints(conf,serverConf);

const compiler = webpack(conf);

var server = new WebpackDevServer(compiler,serverConf);

server.listen(serverConf.port,serverConf.host,(res)=>{
    console.log(`dev sever running on http://${serverConf.host}:${serverConf.port}`);
});
