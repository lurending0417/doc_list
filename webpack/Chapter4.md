掘金小册：使用 webpack 定制前端开发环境
基于webpack4.x

### 四：配置 loader 
#### 1.  loader 匹配规则
    在module.rules数组中添加匹配规则。
    loader 的匹配规则中有两个最关键的因素：
    1. 一个是匹配条件。
        使用请求资源文件的绝对路径来进行匹配（resource）
        声明依赖请求的源文件的绝对路径（issuer）
        eg： 在 /path/to/app.js 中声明引入 import './src/style.scss'
            resource: /path/to/src/style.scss
            issuer: /path/to/app.js
        test和include都用于匹配resource路径，是resource.test 和 resource.include 的简写,也可以这样写：
        rules: [ 
          {
            resource: { // resource 的匹配条件
              test: /\.jsx?/, 
              include: [ 
                path.resolve(__dirname, 'src'),
              ],
            },
            // 如果要使用 issuer 匹配，便是 issuer: { test: ... }
            use: 'babel-loader',
          }
        ]
        回顾了第二章的内容，突然就懂了在src下面引用css文件夹中的css文件为什么编译不过的原因了，把路径改成： path.join(__dirname, 'src', '../css') 这个就好了
        额，这样也行：path.resolve(__dirname, 'css')
    2. 一个是匹配规则后的应用

#### 2.  规则条件配置
    { test: ... } 匹配特定条件
    { include: ... } 匹配特定路径
    { exclude: ... } 排除特定路径
    { and: [...] }必须匹配数组中所有条件
    { or: [...] } 匹配数组中任意一个条件
    { not: [...] } 排除匹配数组中所有条件...

    字符串：必须以提供的字符串开始，所以是字符串的话，这里我们需要提供绝对路径
    正则表达式：调用正则的 test 方法来判断匹配
    函数：(path) => boolean，返回 true 表示匹配
    数组：至少包含一个条件的数组
    对象：匹配所有属性值的条件... 

#### 3. module type
    javascript/auto：即 webpack 3 默认的类型，支持现有的各种 JS 代码模块类型 —— CommonJS、AMD、ESM
    javascript/esm：ECMAScript modules，其他模块系统，例如 CommonJS 或者 AMD 等不支持，是 .mjs 文件的默认类型
    javascript/dynamic：CommonJS 和 AMD，排除 ESM
    javascript/json：JSON 格式数据，require 或者 import 都可以引入，是 .json 文件的默认类型
    webassembly/experimental：WebAssembly modules，当前还处于试验阶段，是 .wasm 文件的默认类型...

#### 4. loader 应用顺序
        1. 同一个rule配置了多个loader,则是从右至左
        2. 多个 rule 匹配了同一个模块文件，配置 pre 或post
            （enforce: 'pre', // 指定为前置类型）
        3. 行内：json-loader!./file.json等等
            （不建议在应用开发中使用这种 loader）
        所有的 loader 按照前置 -> 行内 -> 普通 -> 后置的顺序执行

#### 5. 使用noParse
        配置哪些模块文件的内容不需要进行解析

#### 6. 常见loader
        1. babel-loader: es5语法转换
        2. css-loader:
        3. style-loader:
        4. postcss-loader:
        5. sass-loader:
        6. wechat-mina-loader:
        7. vue-loader:
        8. file-loader:
        9. url-loader:内置file-loader,将文件转成base64字符串,文件大小会影响编码速度
        10. 