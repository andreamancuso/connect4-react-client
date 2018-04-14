/* eslint global-require: 0, import/no-dynamic-require: 0 */

import path from "path";
import webpack from "webpack";
import {dependencies} from './package.json';

module.exports = {
    resolve: {
        extensions: [".js", ".jsx"]
    },
    entry: {
        deps: Object.keys(dependencies)
            .filter(dep => dep.indexOf('@') === -1),
    },
    target: 'web',
    output: {
        library: 'deps',
        path: path.join(__dirname, "public"),
        filename: 'bundle.dll.js',
        libraryTarget: 'var'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "build", "deps-manifest.json"),
            name: 'deps'
        })
    ]
};
