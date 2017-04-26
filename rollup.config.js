import babel from "rollup-plugin-babel";
import multidest from "rollup-plugin-multidest";
import nodeResolve from "rollup-plugin-node-resolve";
import uglify from "rollup-plugin-uglify";
import license from "rollup-plugin-license";
import { minify } from 'uglify-js-harmony';

export default {
    entry: "src/moy.js",
    dest: "dist/moy.js",
    format: "iife",
    moduleName: "bar",
    plugins: [
        license({
            banner: `<%= pkg.name %> v<%= pkg.version %>
                    <%= pkg.description %>
                    author : <%= pkg.author %>
                    homepage : <%= pkg.homepage %>
                    bugs : <%= pkg.bugs.url %>`,
        }),
        nodeResolve(),
        multidest([
            // targets "main" in package.json
            {
                dest: "dist/moy.cjs.js",
                format: "cjs"
            },
            // targets browsers
            {
                dest: "dist/moy.min.js",
                format: "iife",
                plugins: [uglify({}, minify)]
            }
        ]),
        babel({
            exclude: "node_modules/**" // only transpile our source code
        })
    ]
};
