var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var streamqueue = require('streamqueue');

gulp.task('default', function() {
  gulp.start('build');
});

gulp.task('build', function () {
  gulp.start('compile-style');
  gulp.start('compile-js');
  gulp.start('copy-vendor');
  gulp.start('copy-assets');
});

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['compile-style']);
  gulp.watch('src/js/**/*.js', ['compile-js']);
  gulp.watch('src/vendor/**/*', ['copy-vendor']);
  gulp.watch('src/index.html', ['copy-assets']);
});

gulp.task('compile-style', function() {
  gulp
    .src('src/scss/main.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./build'));
});

gulp.task('compile-js', function() {
  streamqueue({ objectMode: true }, gulp.src('./src/js/**/*.js'))
    .pipe(concat('app.js'))
    .pipe(
      babel({
        presets: ['es2015']
      })
    )
    .pipe(gulp.dest('./build'));
});

gulp.task('copy-assets', function() {
  gulp.src('src/index.html')
  .pipe(gulp.dest('./build'));
});

gulp.task('copy-vendor', function() {
  gulp.src('src/vendor/**/*')
  .pipe(gulp.dest('./build/vendor'));
});

