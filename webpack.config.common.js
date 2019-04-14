/* eslint global-require: 0, import/no-dynamic-require: 0 */

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  return {
    entry: ['./src/fe'],
    output: {
      publicPath: '/'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
      /*alias: {
        components: path.resolve(__dirname, 'src/components/'),
        actions: path.resolve(__dirname, 'src/actions/'),
        selectors: path.resolve(__dirname, 'src/selectors/'),
        reducers: path.resolve(__dirname, 'src/reducers/'),
        lib: path.resolve(__dirname, 'src/lib'),
        types: path.resolve(__dirname, 'src/types'),
        utils: path.resolve(__dirname, 'src/utils')
      }*/
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader' }]
        },
        {
          test: /\.(ts|tsx)$/,
          loader: 'ts-loader',
          options: {
            compilerOptions: { module: 'es2015' }
          },
          exclude: /node_modules/
        },
        {
          test: /\.less$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            {
              loader: 'less-loader'
            }
          ]
        },
        {
          test: /\.css$/,
          use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: { name: '[path][name].[hash].[ext]' }
            }
          ]
        }
      ]
    },
    plugins: [
      // new BundleAnalyzerPlugin(), // IMPORTANT: Leave this commented out when checking in your changes
      new webpack.DefinePlugin({
        ENV: env && env.ENV ? JSON.stringify(env.ENV) : JSON.stringify('development'),
        MOCKS_URL: env && env.MOCKS_URL ? JSON.stringify(env.MOCKS_URL) : JSON.stringify('')
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.ejs')
      }),
      // see: https://medium.com/@michalozogan/how-to-split-moment-js-locales-to-chunks-with-webpack-de9e25caccea
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.HashedModuleIdsPlugin()
    ],
    optimization: { splitChunks: { chunks: 'all' } }
  };
};
