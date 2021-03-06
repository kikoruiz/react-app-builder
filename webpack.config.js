var TARGET = process.env.npm_lifecycle_event;
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      exclude: path.join(__dirname, 'node_modules'),
      include: path.join(__dirname, 'src')
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }]
  }
};
var config;
var mainEntry = './src/index.js';

if (!TARGET || TARGET === 'start') {
  config = {
    devtool: 'eval',
    entry: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      mainEntry
    ],
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
  };
}

if (TARGET === 'build') {
  config = {
    entry: mainEntry
  };
}

module.exports = merge(baseConfig, config);
