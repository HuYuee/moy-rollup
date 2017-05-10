import babel from "rollup-plugin-babel";
import multidest from "rollup-plugin-multi-dest";
import nodeResolve from "rollup-plugin-node-resolve";
import uglify from "rollup-plugin-uglify";
import license from "rollup-plugin-license";
import { minify } from 'uglify-js-harmony';

export default {
    entry: "src/moy.js",
    dest: "dist/moy.js",
    format: "umd",
    moduleName: "bar",
    plugins: [
        license({
            //加入文件注释头
            banner: `<%= pkg.name %> v<%= pkg.version %>
                    <%= pkg.description %>
                    author : <%= pkg.author %>
                    homepage : <%= pkg.homepage %>
                    bugs : <%= pkg.bugs.url %>`,
        }),
        nodeResolve(),//将第三方库打包进入口文件
        multidest([
            // 提供可以一次性编译出多个版本
            {
                dest: "dist/moy.cjs.js",
                format: "cjs"//按照cmd格式编译打包
            },
            {
                dest: "dist/moy.min.js",
                format: "iife",//按照<script>标签引入到浏览器中能识别的格式
                plugins: [uglify({}, minify)]//压缩
            }
        ]),
        babel({
            exclude: "node_modules/**" // 排除node_modules文件夹
        })
    ]
};
