var path = require("path");
var webpack = require("webpack");
function resolve(dir){
    return path.join(__dirname,dir)
}
// http://m.bestcake.com/json1811.ashx?v=1572837110413&c=NewIndexController&m=index
module.exports={
    //配置相对路径
    publicPath: "./",
    //配置代理
    devServer:{
        host: "0.0.0.0",
        port: 80,
        proxy: {
            "/apis": {
                target: "http://m.bestcake.com",
                changeOrigin: true,
                pathRewrite: {
                    "^/apis": ""
                }
            }
        }
    },
    //设置别名
    chainWebpack: config => {
        config.resolve.alias.set("@",resolve("src"));
    },
    //全局设置插件
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            })
        ]
    },
    //设置全局scss
    css: {
        loaderOptions: {
            sass: {
                prependData:`
				@import "~@/assets/css/index.scss";
			`
            }
        }
    }
}