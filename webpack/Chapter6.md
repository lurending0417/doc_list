掘金小册：使用 webpack 定制前端开发环境
基于webpack4.x

### 六：更好地使用 webpack-dev-server
  webpack-dev-server 是 webpack 官方提供的一个工具，可以基于当前的 webpack 构建配置快速启动一个静态服务。当 mode 为 development 时，会具备 hot reload 的功能
#### 1. 基础使用
        {
          "scripts": {
            "start": "webpack-dev-server --mode development"
          }
        }
        默认端口：8080
        如果你使用了 html-webpack-plugin 来构建 HTML 文件，并且有一个 index.html 的构建结果，那么直接访问 http://localhost:8080/ 就可以看到 index.html页面 了，如果没有 HTML 文件的话，那么 webpack-dev-server会生成一个展示静态资源列 表的页面。

#### 2. 常用配置(devServer)
      devServer:{
          public: 'http://localhost:8080/', // 不知道是不是字符串 
          port： 8080, // 静态服务的端口
          publicPath : 'http://localhost:8080/assets/', 
          // 用于指定构建好的静态文件在浏览器中用什么路径去访问，默认是 /
          // 如果你使用了 HMR，那么要设置 publicPath 就必须使用完整的 URL。
          // 建议将 devServer.publicPath 和 output.publicPath
          proxy: {
            '/api': {
              target: "http://localhost:3000", // 将 URL 中带有 /api 的请求代理到本地的 3000 端口的服务上
              pathRewrite: { '^/api': '' }, // 把 URL 中 path 部分的 `api` 移除掉
            }
          },
          contentBase: path.join(__dirname, "public"), 
          // 用于配置提供额外静态文件内容的目录
          before(app){// 用于拦截部分请求返回特定内容
            app.get('/some/path', function(req, res) { 
              // 当访问 /some/path 路径时，返回自定义的 json 数据
              res.json({ custom: 'response' })
            })
          }
        }

#### 3. 实现一个简单的mock服务