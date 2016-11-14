var webpack= require("webpack");

module.exports={
    entry:{
        bundle:[ "./src/app.js"]
    },
    output:{
        path:__dirname,
        publicPath:"/",
        filename:"build/[name].js"
    },
    module:{
        loaders:[
            {test: /\.html$/, loaders: ['html']},
            {test: /(\.js)$/, loader:["babel"] ,exclude:/node_modules/, 
             query:{
                    presets:["es2015"]
             }
            }
        ]
    },
    resolve:{
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    plugins:[
         new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}