掘金小册：使用 webpack 定制前端开发环境
基于webpack4.x

二：搭建基本的前端开发环境
	1. 基本需求
		a.构建我们发布需要的 HTML、CSS、JS 文件
		b.使用 CSS 预处理器来编写样式
		c.处理和压缩图片
		d.使用 Babel 来支持 ES 新特性
		e.本地提供静态服务以方便开发调试
	2. 提取webpack需求
		a. 关联HTML( html-webpack-plugin )
			①.  webpack的默认入口是js文件，但是通常前端项目都是从HTML开始的
		   		所以需要将打包后的文件在入口HTML文件里面引入：
		   		<script src="./dist/bundle.js"></script>
		   	②.  安装(html-webpack-plugin -D)
		   	③.  配置(plugins),需要先引入
		   		const HtmlWebpackPlugin = require('html-webpack-plugin')
		   		plugins: [
					new HtmlWebpackPlugin({
						filename: 'index.html',  // 配置输出文件名和路径
						template: 'assets/index.html'  // 配置文件模板(已经建好的模板)
					})
		   		]
		   	④. 如果有多个入口，在plugins数组中new多个实例就行
		b. 构建css( loader)
			loader在使用时需要先下载(style-loader!css-loader!)
			①.  css-loader: 处理css文件中的依赖(@import,url()),只处理路径，并不会将url内所引用的图片一起处理
			②.  style-loader: 将css-loader处理之后的结果转化成js代码，在运行时转化成style标签
				module: {
					rules: [{
						test: /\.css/,
						include: [
							path.resolve(__dirname, 'src')
						],
						<!-- use: ['style-loader', 'css-loader'], -->
						use: [
		                	{loader: 'style-loader'},
		                	{loader: 'css-loader', options: {modules: true}}
		           		]					
					}]
				}
		c.  css预处理器( less sass )
		d.  处理图片文件( file-loader )
		e.  使用babel( babel-loader )
		f.  启用静态服务( webpack-dev-server )