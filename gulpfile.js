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

console.log(`Building minified version: ${minimize}`);

requireDir('./gulpTasks');

gulp.task('default', ['buildAll']);

gulp.task('buildAll', function (done) {
  runsequence('clean', ['css', 'setup'], 'compileAll', done);
});

gulp.task('format', function (done) {
  runsequence('clean', 'prettify', done);
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
