掘金小册：使用 webpack 定制前端开发环境
基于webpack4.x

### 三：webpack 如何解析代码模块路径  
#### 1.  模块解析规则( resolve )
        resolve: {
			alias: {
			  	utils: path.resolve(__dirname, 'src/utils') 
                // 这里使用 path.resolve 和 __dirname 来获取绝对路径
			},
            extensions:  ['.wasm', '.mjs', '.js', '.json', '.jsx'],
            // 这里的顺序代表匹配后缀的优先级，例如对于 index.js 和     
            // index.jsx，会优先选择 index.js
            modules: [
                // 指定当前目录下的 node_modules 优先查找
                path.resolve(__dirname, 'node_modules'), 
                'node_modules'
            ],
            // 配置 target === "web" 或者 target === "webworker" 时 mainFields // 默认值是：
            mainFields: ['browser', 'module', 'main'],
		}

总结：这章有点懵，没有试验过