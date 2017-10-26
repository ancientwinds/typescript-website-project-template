const gulp = require('gulp');
const gutil = require('gulp-util');

process.env.NODE_ENV = gutil.env.config || 'development';
process.env.CUSTOM_BUNDLE = gutil.env.bundle || 'support';

const requireDir = require('require-dir');
const rmdir = require('gulp-rimraf');
const livereload = require('gulp-livereload');
const runsequence = require('run-sequence');
const minimize = process.argv.indexOf('--minimize') !== -1;
const _ = require('underscore');

var bannerMsg = minimize ? 'Building minified version' : 'Building non minified version';

requireDir('./gulpTasks');

gulp.task('default', ['buildAll']);

gulp.task('buildAll', function (done) {
  runsequence('clean', ['css', 'setup'], 'prettify', 'compileAll', done);
});

gulp.task('build', function (done) {
  console.log((bannerMsg + ' of the library [' + process.env.CUSTOM_BUNDLE + ' bundle]').bgGreen.red);
  runsequence('clean', ['css', 'setup'], 'prettify', 'compile', done);
});

gulp.task('clean', function () {
  return gulp.src(['./bin', './zip'], {
    read: false
  })
    .pipe(rmdir());
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(['./css/**/*.css'], ['buildAll']);
  gulp.watch(['./views/**/*.html'], ['buildAll']);
  gulp.watch(['./src/**/*.ts'], ['buildAll']);
  // gulp.watch(['./views/**/*'], ['prepareVFComponents', 'preparePages']);
});
