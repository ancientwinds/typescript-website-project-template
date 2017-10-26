const gulp = require('gulp');
// const sass = require('gulp-sass');
const eventStream = require('event-stream');

gulp.task('css', ['prepare-css', 'build-css']);

gulp.task('prepare-css', function () {
  return eventStream.merge(
    gulp.src('./css/**/*')
    .pipe(gulp.dest('./bin/css/'))
  ).pipe(eventStream.wait());
});

gulp.task('build-css', function () {
  return gulp.src('./css/**/*.css')
    .pipe(gulp.dest('./bin/css'));
});
