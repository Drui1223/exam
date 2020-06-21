const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
let {smart} = require('webpack-merge');
let base = require('./webpack.base');
module.exports=smart(base,{
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin(), new OptimizeCssAssetsWebpackPlugin()]
    },
    plugins:[
        new CleanWebpackPlugin()
    ]
})