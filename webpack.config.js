const webpack = require('webpack');
const path = require('path');
const minimize = process.argv.indexOf('--minimize') !== -1;
const failPlugin = require('webpack-fail-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "css/myApp.css"
});

// Fail plugin will allow the webpack ts-loader to fail correctly when the TS compilation fails
let plugins = [failPlugin, extractSass];

if (minimize) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.scss']
  },
  entry: './src/Index.ts',
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: minimize ? 'js/myApp.bundle.min.js' : 'js/myApp.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use:[{
            loader: 'css-loader',
            options: { sourceMap: false }
          },{
            loader: 'sass-loader',
            options: { sourceMap: true }
          }]
        })
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: plugins
};
