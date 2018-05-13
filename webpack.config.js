/* eslint global-require: 0, import/no-dynamic-require: 0 */

import fs from "fs";
import path from "path";
import webpack from "webpack";
import { execSync } from 'child_process';

import {dependencies} from './package.json';

const port = process.env.PORT || 1212;
const publicPath = `http://localhost:${port}`;

const dllPath = path.resolve(__dirname, 'public', 'bundle.dll.js');
const manifestPath = path.resolve(__dirname, 'build', 'deps-manifest.json');

/**
 * Warn if the DLL is not built
 */
if (!(fs.existsSync(dllPath) && fs.existsSync(manifestPath))) {
    console.log('The DLL files are missing. Running "npm run dev-dll"');
    execSync('npm run dev-dll');
}

export default {
    devtool: 'inline-source-map',

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },

    entry: [
        'react-hot-loader/patch',
        path.join(__dirname, 'src/fe/index.tsx'),
    ],

    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.dev.js',
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                // loader: 'awesome-typescript-loader',
                loader: 'ts-loader',
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // WOFF Font
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff',
                    }
                },
            },
            // WOFF2 Font
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff',
                    }
                }
            },
            // TTF Font
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/octet-stream'
                    }
                }
            },
            // EOT Font
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: 'file-loader',
            },
            // SVG Font
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'image/svg+xml',
                    }
                }
            },
            // Common Image Formats
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
                use: 'url-loader',
            }
        ]
    },

    plugins: [
        new webpack.DllReferencePlugin({
            manifest: require(manifestPath),
            sourceType: 'var',
        }),

        new webpack.NamedModulesPlugin(),

        new webpack.HotModuleReplacementPlugin(),

        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),

        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ],

    node: {
        __dirname: false,
        __filename: false
    },

    devServer: {
        port,
        publicPath,
        compress: true,
        noInfo: true,
        stats: 'verbose',
        inline: true,
        lazy: false,
        hot: true,
        headers: {'Access-Control-Allow-Origin': '*'},
        contentBase: path.join(__dirname, 'public'),
        watchOptions: {
            aggregateTimeout: 300,
            ignored: /node_modules/,
            poll: 100
        },
        historyApiFallback: {
            verbose: true,
            disableDotRule: false,
        },
        proxy: {
            '^/api/*': {
                target: 'http://localhost:3000/',
                secure: false
            }
        }
    },
}
