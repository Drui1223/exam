const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    entry: path.join(__dirname, '../src/main.js'),
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'bundle.[hash:8].js',
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    miniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ]
            }, {
                test: /\.(sa|sc)ss$/,
                use: [
                    miniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            }, {
                test: /\.js$/,
                include: path.join(__dirname, '../src'),
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                ['@babel/plugin-proposal-decorators', { "legacy": true }],
                                ['@babel/plugin-proposal-class-properties', { "loose": true }],
                                "@babel/plugin-transform-runtime"
                            ],
                        }
                    }
                ]
            }, {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                        }
                    }
                ],
            }, {
                test: /\.(woff|woff2|eot|svg|ttf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit:10000,
                            esModule: false,
                        }
                    }
                ],
            }, {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            transformAssetUrls: {
                                video: ['src', 'poster'],
                                source: 'src',
                                img: 'src',
                                image: ['xlink:href', 'href'],
                                use: ['xlink:href', 'href']
                            },
                            compiler: require('vue-template-compiler'),
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".vue", '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            "@":path.join(__dirname, '../src'),
        }
    },
    plugins: [
        //html模板
        new htmlWebpackPlugin({
            template: path.join(__dirname, '../index.html'),
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
            }
        }),
        //抽离css
        new miniCssExtractPlugin({
            filename: 'main.css'
        }),
        //vue
        new VueLoaderPlugin(),
    ]
}