/* eslint-disable */

'use strict';

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const pkg = require('./package');

const ROOT = __dirname;
const BUILD_DATE = new Date().toISOString();
const { NODE_ENV = 'development' } = process.env;

const banner = (env) => `/**!
  * @build-info ${env} - ${BUILD_DATE}

  * @name ${pkg.name}
  * @version ${pkg.version}
  * @author ${pkg.author}
  * @description ${pkg.description}
  * @contributors [
    * ${pkg.contributors.join('\n    * ')}
  * ]

  * @homepage ${pkg.homepage}
  * @keywords [ ${pkg.keywords.join(', ')} ]
  * @license ${pkg.license}
**/`;

const config = () => ({
  mode: NODE_ENV,
  target: 'web',
  devtool: 'source-map',
  context: path.join(ROOT, 'src'),
  externals: [nodeExternals()],
  entry: {
    [pkg.name]: [`./${pkg.name}.ts`],
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(ROOT, 'dist', NODE_ENV),
    filename: `[name].${NODE_ENV}.js`,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.[tj]sx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          emitWarning: NODE_ENV === 'development',
        },
      },
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {},
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: banner(NODE_ENV),
      raw: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
  ],
});

module.exports = config;
