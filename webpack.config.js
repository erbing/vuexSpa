const path = require("path");      // 引入 path 获取 文件路径
const webpack= require("webpack"); // 引入 webpack
const glob = require("glob");      // 引入 glob glob模块，用于读取webpack入口目录文件

const ExtractTextPlugin = require('extract-text-webpack-plugin');    // webpack插件
const HtmlWebpackPlugin = require('html-webpack-plugin');           // webpack插件
const OpenBrowserPlugin = require('open-browser-webpack-plugin');   // webpack插件
const CleanPlugin = require('clean-webpack-plugin');                // webpack插件，用于清除目录文件

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;     // webpack 优化 提取公共文件

var getEntry = function() {
    var entry = {};
    //读取开发目录,并进行路径裁剪
    glob.sync('./src/**/*.js')
        .forEach(function(name) {
            var start = name.indexOf('src/') + 4,
                end = name.length - 3;
            var n = name.slice(start, end);
            n = n.slice(0, n.lastIndexOf('/'));
            //保存各个组件的入口
            entry[n] = name;
        });
    return entry;
};
// 判断编译环境 （运行环境）
var prod = process.env.NODE_ENV === 'production' ? true : false;

module.exports = {
    entry: getEntry(),
    output:{
        // path: path.resolve(__dirname, prod ? "./build" : "./dist"),
        // filename: prod ? "build/[name].min.js" : "build/[name].js",
        // chunkFilename: 'js/[name].chunk.js',
        // publicPath: prod ? "/" : ""
        path:__dirname,
        publicPath:"/",
        filename:"build/[name].js"
    },
    module:{
        loaders: [{         // 处理图片
            test: /\.(png|jpg|jpeg|gif)$/,
            loader: 'url?limit=10000&name=images/[name].[ext]'
        }, {                // 处理 less、css 文件
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style', 'css!less')
        }, 
        {                // 处理 js 文件
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel?presets[]=es2015'
        }, 
        {                // html 中的  img src 的路径
            test: /\.html$/,
            loader: 'html?attrs=img:src img:srcset'
        }]
    },
    resolve:{
        //配置项,设置忽略js后缀
        extensions: ['', '.js', '.less', '.css', '.png', '.jpg'],
        root: './src',
        alias: {
            'vue$': 'vue/dist/vue'
        }
    },
    plugins:[
         new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        }),
        new CleanPlugin(['dist', 'build']),
        // 启动热替换
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        }),
        new webpack.NoErrorsPlugin(),
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        }),
        /* 公共库 */
        new CommonsChunkPlugin({
            name: 'vendors',
            minChunks: Infinity
        }),
    ]
};

// 判断开发环境还是生产环境,添加uglify等插件
if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || [])
        .concat([
            new webpack.DefinePlugin({
                __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new webpack.optimize.OccurenceOrderPlugin(),
        ]);
} else {
    module.exports.devtool = 'source-map';
    module.exports.devServer = {
        port: 8080,
        contentBase: './build',
        hot: true,
        historyApiFallback: true,
        publicPath: "",
        stats: {
            colors: true
        },
        plugins: [
        new webpack.HotModuleReplacementPlugin()
        ]
    };
}