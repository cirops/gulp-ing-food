const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const streamqueue = require('streamqueue');

gulp.task('default', () => gutil.log('Gulp is running!'));

// Default task
gulp.task('default', () => gulp.start('scss').start('js'));

// Watch file changes
gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['scss']);
  gulp.watch('src/js/**/*.js', ['js']);
});

// Compile Sass
gulp.task('scss', () =>
  gulp
    .src('src/scss/main.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./build')));

// Compile Js
gulp.task('js', () =>
  streamqueue({ objectMode: true }, gulp.src('./src/js/**/*.js'))
    .pipe(concat('app.js'))
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(gulp.dest('./build')));
