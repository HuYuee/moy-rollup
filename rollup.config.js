import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";
import multiEntry from 'rollup-plugin-multi-entry';
import multidest from 'rollup-plugin-multidest';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

var type = process.env.TYPE,
    config = {};
if (type && type === "build") {
    config = {
        dest: "build/moy.min.js",
        plugins: [
            resolve({
                jail: "/"
            }),
            multiEntry({
                exports: false
            }),
            uglify(),
            babel({
                exclude: "node_modules/**" // only transpile our source code
            })
        ]
    };
} else {
    config = {
        // dest: "build/moy.js",
        dest: "build/index.js",
        plugins: [
            resolve({ jsnext: true, main: true }),
            // multiEntry({ exports: false }),
            babel({
                exclude: "node_modules/**" // only transpile our source code
            }),
  //           serve({
  //               // Launch in browser (default: false)
  //               open: true,
  //
  //               // Show server address in console (default: true)
  //               verbose: false,
  //
  //               // Folder to serve files from
  //               contentBase: '',
  //
  //               // Multiple folders to serve from
  //               contentBase: ['dist'],
  //
  //               // Set to true to return index.html instead of 404
  //               historyApiFallback: false,
  //
  //               // Options used in setting up server
  //               host: 'localhost',
  //               port: 10001
  //           }), // index.html should be in root of project
  //           livereload({
  //               watch: 'dist'
  // // verbose: false, // Disable console output
  //
  //           })
        ]
    };
}

export default {
    entry: "src/moy.js",
    // entry: "src/*.js",
    format: "iife",
    moduleName: "bar",
    plugins: config.plugins,
    dest: config.dest
};
