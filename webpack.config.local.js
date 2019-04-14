'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const commonWebpackConfig = require('./webpack.config.common');

module.exports = (env) => {
  return merge(commonWebpackConfig({ ...process.env, ...env }), {
    output: {
      filename: '[name].[hash].js'
    },
    plugins: [
      new webpack.DefinePlugin({
        ENV: JSON.stringify('development'),
        'process.env.NODE_ENV': JSON.stringify('development'),
        NODE_ENV: JSON.stringify('development'),
        API_URL: JSON.stringify('http://localhost:3000')
      })
    ],
    devServer: {
      historyApiFallback: true,
      disableHostCheck: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
      }
    }
  });
};
