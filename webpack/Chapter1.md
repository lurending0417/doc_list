掘金小册：使用 webpack 定制前端开发环境
基于webpack4.x

一：webpack基础
	1. entry(入口)
		默认为： ./src/index.js
		a. 单页应用：单一入口
			module.exports = {
			  	entry: './src/index.js' 
			}
			等价于
			module.exports = {
				entry: {
					main: '.src/index.js'
				}
			}
		b. 多页应用：多个入口
			module.exports = {
				entry: {
					'foo1': '.src/foo1.js',
					'foo2': '.src/foo2.js'
				}
			}
			等价于
			module.exports = {
				entry: {
					main: ['.src/foo1.js', '.src/foo2.js']
				}
			}
	2. loader(转换器？)
		webpack提供一种将未知格式的文件转化成其可以识别的文件的转化机制，即loader
		当存在多个loader时，执行顺序是从右至左
		eg. 
		module.exports = {
			rules: [
				{
					test: /\.js$/, // 匹配文件路径的正则表达式，一般使用文件后缀
					include： [
						path.resolve(__dirname, 'src') 
						// 指定需要处理的文件所在的路径(绝对路径)
					],
					use: 'babel-loader'
				}
			]
		}
	3. plugin(插件)
		用于处理特殊的需求
		eg.
		module.exports = {
			plugins: [
				new UglifyPlugin() // 需要引入
			]
		}
	4. output(输出)
		webpack最终构建出来的静态文件
		默认为： .dist/main.js
		a. 单一入口
		module.exports = {
			output: {
				path: path.resolve(__dirname, 'dist'),
				filename: 'main.js'
			}
		}
		module.exports = {
			output: {
				path: __dirname + '/dist/[hash]'
				filename: '[name].js'
			}
		}		
		b. 多个入口
		module.exports = {
			entry: {
				'foo1': '.src/foo1.js',
				'foo2': '.src/foo2.js'
			},
			output: {
				path: __dirname + 'dist',
				filename: '[name].js' // 使用hash值，每次打包都会有一个不同的hash值，避免发布新版本的时候使用缓存
			}			
		}
	总结： webpack打包时默认运行项目根目录内的webpack.config.js
	疑问： webpack 的配置其实是一个 Node.js 的脚本，这个脚本对外暴露一个配置对象，webpack 通过这个对象来读取相关的一些配置。path的部分疑问