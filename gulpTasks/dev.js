'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var server = express();
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('../webpack.config.js');
var gulp = require('gulp');
var path = require('path');

gulp.task('dev', ['css', 'setup', 'watch'], function (done) {
  // set the view engine to ejs
  server.set('view engine', 'ejs');

  server.use(express.static(path.resolve('./bin')));
  server.use(express.static(path.resolve('./bin')));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({extended: true}));

  server.use(require('../routes/pages'));

  let serverConfiguration = {};
  serverConfiguration.serverPort = 8080;
  serverConfiguration.serverIpAddress = '127.0.0.1';

  server.listen(serverConfiguration.serverPort, serverConfiguration.serverIpAddress, function () {
    console.log('Listening on ' + serverConfiguration.serverIpAddress + ', port ' + serverConfiguration.serverPort);
  });

  const compiler = webpack(webpackConfig);

  new WebpackDevServer(compiler, {
    historyApiFallback: true,
    contentBase: './bin',
    publicPath: '/js/',
    compress: true,
    proxy: {
      '*': 'http://' + serverConfiguration.serverIpAddress + ':' + serverConfiguration.serverPort
    }
  }).listen(3001, serverConfiguration.serverIpAddress, function (err, result) {
    if (err) {
      console.log(err);
      console.log(result);
    }
    console.log('Listening at ' + serverConfiguration.serverIpAddress + ':3001');
  });

  done();
});
