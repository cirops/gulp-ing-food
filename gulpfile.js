var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var babel = require("gulp-babel");
var streamqueue = require("streamqueue");

// Default task
gulp.task("default", function() {
  gulp.start("scss");
  gulp.start("js");
});

// Watch file changes
gulp.task("watch", function() {
  gulp.watch("src/scss/**/*.scss", ["scss"]);
  gulp.watch("src/js/**/*.js", ["js"]);
  gulp.watch("src/index.html", ["copy-assets"]);
});

// Compile sass
gulp.task("scss", function() {
  gulp
    .src("src/scss/main.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest("./build"));
});

// Compile js
gulp.task("js", function() {
  streamqueue({ objectMode: true }, gulp.src("./src/js/**/*.js"))
    .pipe(concat("app.js"))
    .pipe(
      babel({
        presets: ["es2015"]
      })
    )
    .pipe(gulp.dest("./build"));
});

// Copy Index to build
gulp.task('copy-assets', function() {
  gulp.src('src/index.html')
  // Perform minification tasks, etc here
  .pipe(gulp.dest('./build'));
});

