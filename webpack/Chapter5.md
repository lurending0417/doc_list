掘金小册：使用 webpack 定制前端开发环境
基于webpack4.x

### 五：使用Plugin
#### 1.  DefinePlugin
        内置的插件,使用 webpack.DefinePlugin 直接获取,用于创建一些在编译时可以配置的全局常量（定义环境变量）
        plugins: [
            new webpack.DefinePlugin({
              PRODUCTION: JSON.stringify(true), // const PRODUCTION = true
              VERSION: JSON.stringify('5fa3b9'), // const VERSION = '5fa3b9'
              BROWSER_SUPPORTS_HTML5: true, 
              // const BROWSER_SUPPORTS_HTML5 = 'true'
              TWO: '1+1', // const TWO = 1 + 1,
              CONSTANTS: {
                APP_VERSION: JSON.stringify('1.1.2') 
                // const CONSTANTS = { APP_VERSION: '1.1.2' }
              }
            }),
          ]
        1. 如果配置的值是字符串，那么整个字符串会被当成代码片段来执行，其结果作为最终变量的值，如上面的 "1+1"，最后的结果是 2
        2. 如果配置的值是字符串，那么整个字符串会被当成代码片段来执行，其结果作为最终变量的值，如上面的如果配置的值不是字符串，也不是一个对象字面量，那么该值会被转为一个字符串，如 true，最后的结果是 'true'
        3. 如果配置的是一个对象字面量，那么该对象的所有 key 会以同样的方式去定义

#### 2. copy-webpack-plugin
        某些文件不需要webpack处理，但是仍然需要发布，这个插件就是用来copy这些文件的
        new CopyWebpackPlugin([
          { from: 'src/file.txt', to: 'build/file.txt', }, 
          // 顾名思义，from 配置来源，to 配置目标路径
          { from: 'src/*.ico', to: 'build/*.ico' }, 
          // 配置项可以使用 glob
          // 可以配置很多项复制规则
        ])

#### 3. extract-text-webpack-plugin
        分离css
        rules: [
          {
            test: /\.css$/,
            // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
            use: ExtractTextPlugin.extract({ 
              fallback: 'style-loader',
              use: 'css-loader',
            }), 
          },
        ]
        plugins: [
            // 引入插件，配置文件名，这里同样可以使用 [hash]
            new ExtractTextPlugin('index.css'),
        ],

#### 4. ProvidePlugin
         webpack 内置的插件，我们可以直接使用 webpack.ProvidePlugin 来获取
         该组件用于引用某些模块作为应用运行时的变量，从而不必每次都用 require 或者 import
         new webpack.ProvidePlugin({
           identifier: 'module',
           // ...
         })
         // 或者
         new webpack.ProvidePlugin({
           identifier: ['module', 'property'], // 即引用 module 下的 property，类似 import { property } from 'module'
           // ...
         })

#### 5. IgnorePlugin
        webpack 内置的插件，可以直接使用 webpack.IgnorePlugin 来获取。
        用于忽略某些特定的模块，让 webpack 不把这些指定的模块打包进去
        module.exports = {
          // ...
          plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
          ]
        }
        IgnorePlugin 配置的参数有两个，第一个是匹配引入模块路径的正则表达式，第二个是匹配模块的对应上下文，即所在目录名。