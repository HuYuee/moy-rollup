# moy-rollup

[rollup官网](https://rollupjs.org/)

**特别声明**：
> 如果你的工作内容是基于es2015（也就是es6），并且不需要[代码分割](https://webpack.toobug.net/zh-cn/chapter3/chunks.html)，也不需要[模块热替换（HMR)](https://webpack.js.org/concepts/hot-module-replacement/)，那么你可以很愉快的使用rollup进行开发了。不然，建议使用gulp+rollup。让gulp去解决那些问题。

## 优势（与webpack相比）

- 代码的内容格式：编译运行出来的内容，人能看，并且能调试。如果你没办法理解我说的话，可以去看看webpack打包出来的代码

- 命令行的角度：比webpack更加的人性化，有什么问题或者警告都很详细的描述出来，并且准确的提供问题所在文件的位置，方便查找问题

- 如果是引入第三方的js，一旦import进来就会加载进入入口文件中，但如果不是第三方的js，要引入进来之后进行export操作或者执行，才会被解析到入口文件中

  ​


## 所用插件

- "babel-plugin-external-helpers": 这个模块是在.babelrc文件中体现，目的是让babel转义出来的帮助性代码只在该文件的头部出现一次，而不会再每个引入的模块中加入

- "babel-preset-latest":  这个模块也是在.babelrc文件中体现，目的是让babel转义的操作移至的最后，等rollup编译代码之后，否则会出错

- "rollup-plugin-babel": babel转义

- "rollup-plugin-node-resolve": 将import的代码的代码和自己写的代码打包打在一起

- "rollup-plugin-uglify": 压缩代码

- "rollup-watch": 实时监听代码，有修改自动编译

  ​

## 比较好用的插件

- rollup-plugin-multi-entry 多入口打包情况
- rollup-plugin-multidest 多出口打包情况
- gulp-rollup-each 基于gulp的rollup转译的多入口到多出口（本项目中没有涉及到）
- rollup-plugin-license  增加文件头部注释



## 体积比较

针对于本项目来说：

不使用压缩的前提：rollup打包出来的比webpack的少大概120kb
使用压缩的前提：rollup打包出来的比webpack的少大概30kb



## 工具使用问题总结

- 当format改变为umd和iife的时候，如果你的入口文件中有export，那么就需要添加moduleName这个参数，为它产出的文件整体加个变量
  问题解决地址：[https://github.com/rollup/rollup/issues/1157](https://github.com/rollup/rollup/issues/1157)

- 当你遇到下面这个问题的时候：

  >  Error transforming bundle with 'uglify' plugin: SyntaxError:

  你可以使用"uglify-js-harmony"这个库配合"rollup-plugin-uglify"使用，我在项目也详细使用到了。

  问题解决地址:[rollup-plugin-uglify](https://www.npmjs.com/package/rollup-plugin-uglify)   [issues地址](https://github.com/TrySound/rollup-plugin-uglify/issues/13)




## 相关文章

[同中有异的 Webpack 与 Rollup](http://www.tuicool.com/articles/7rEJRjB)



## 问题反馈

由于本项目比较简单，在本文档中就不说明如何使用了，有什么问题可以给我提issue
