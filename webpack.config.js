const webpack = require('webpack');
const path = require('path');
const minimize = process.argv.indexOf('--minimize') !== -1;
const failPlugin = require('webpack-fail-plugin');

// Fail plugin will allow the webpack ts-loader to fail correctly when the TS compilation fails
var plugins = [failPlugin];

if (minimize) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  entry: './src/Index.ts',
  output: {
    path: path.resolve(__dirname, 'bin/js'),
    filename: minimize ? 'myApp.bundle.min.js' : 'myApp.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: plugins
};
