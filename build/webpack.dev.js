let {smart} = require('webpack-merge');
let base = require('./webpack.base');
module.exports=smart(base,{
    mode: 'development',
    devServer: {
        port: 8080,
        // host: 'localhost',
        contentBase:"../dist",
        compress: true,
        proxy:{
            "/api":{
                target:"http://127.0.0.1:7001",
                changeOrigin: true,
                secure: false,
                pathRewrite:{
                    "^/api":'',
                }
            }
        },
        // progress: true,
        historyApiFallback: true,
        quiet:true,
        hot:true,
    },
    devtool:'source-map',
})