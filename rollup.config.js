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
            resolve({
                // use "module" field for ES6 module if possible
                  module: true, // Default: true

                  // use "jsnext:main" if possible
                  // – see https://github.com/rollup/rollup/wiki/jsnext:main
                  jsnext: true,  // Default: false

                  // use "main" field or index.js, even if it's not an ES6 module
                  // (needs to be converted from CommonJS to ES6
                  // – see https://github.com/rollup/rollup-plugin-commonjs
                  main: true,  // Default: true

                  // some package.json files have a `browser` field which
                  // specifies alternative files to load for people bundling
                  // for the browser. If that's you, use this option, otherwise
                  // pkg.browser will be ignored
                  browser: true,  // Default: false

                  // not all files you want to resolve are .js files
                  extensions: [ '.js' ],  // Default: ['.js']

                  // whether to prefer built-in modules (e.g. `fs`, `path`) or
                  // local ones with the same names
                  preferBuiltins: false,  // Default: true

                  // Lock the module search in this path (like a chroot). Module defined
                  // outside this path will be mark has external
                  jail: '/', // Default: '/'

                  // If true, inspect resolved files to check that they are
                  // ES2015 modules
                  modulesOnly: true, // Default: false

                  // Any additional options that should be passed through
                  // to node-resolve
                //   customResolveOptions: {
                //     moduleDirectory: 'node_modules'
                //   }
            }),
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
    entry: "src/index.js",
    // entry: "src/*.js",
    format: "iife",
    moduleName: "bar",
    plugins: config.plugins,
    dest: config.dest
};
