
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var {CleanWebpackPlugin} = require('clean-webpack-plugin')

var SRC_DIR = path.resolve(__dirname,"src")

module.exports ={
    entry: ['@babel/polyfill', './src/js/index.js'],
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:"bundle.js",
        publicPath:'/'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                include: SRC_DIR,
                loader:"babel-loader",
                query:{
                    presets:[[
                        "@babel/env", {
                          "useBuiltIns": "entry"
                        }],
                        "@babel/react"],
                }
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.html$/,
                use:['html-loader']
            },
            {
                test:/\.(jpg|png)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            name:'[name].[ext]',
                            outputPath:'img/',
                            publicPath:'img/'
                        }
                    }
                ]
            }
        ]
    },
    devServer:{
        port:8000,
        contentBase:'src',
        historyApiFallback: true,
        hot:true,
        inline:true
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'src/index.html'
        }),
        new CleanWebpackPlugin()
    ]
}