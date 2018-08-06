掘金小册：使用 webpack 定制前端开发环境
基于webpack4.x

### 七：区分环境
    1. 在webpack 4.x 版本：mode
        webpack 4.x 版本引入了 mode(production、development),webpack 的 mode 参数已经给我们带来了一些很方便的环境差异化配置,但是有些配置还是需要手动区分环境后来进行调整。配置文件可以对外暴露一个函数，函数有两个参数(env,arg),可以通过arg获
        取mode数据
#### 1. 开发环境
      不进行代码压缩，打印 debug 信息，包含 sourcemap
#### 2. 生产环境
      代码压缩，运行时不打印 debug 信息，静态文件不包括 sourcemap
#### 3. 提取公共配置