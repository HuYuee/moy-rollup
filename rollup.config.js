import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

var type = process.env.TYPE,
    config = {};
if (type && type === "build") {
    config = {
        dest: "build/moy.min.js",
        plugins: [
            resolve({
                jail: "/"
            }),
            uglify(),
            babel({
                exclude: 'node_modules/**' // only transpile our source code
            }),
        ]
    }
} else {
    config = {
        dest: "build/moy.js",
        plugins: [
            resolve({
                jail: "/",
                jsnext: true,
            }),
            babel({
                exclude: 'node_modules/**' // only transpile our source code
            }),
        ]
    }
}

export default {
    entry: 'src/moy.js',
    format: 'cjs',
    plugins: config.plugins,
    dest: config.dest
};
