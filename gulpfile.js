const gulp = require("gulp");
var sass = require("gulp-sass")(require("sass"));
var concat = require("gulp-concat");
var babel = require("gulp-babel");
var streamqueue = require("streamqueue");
var del = require("del");

gulp.task("default", function () {
  gulp.start("build");
});

const build = gulp.series(clean, static, styles, scripts, vendor);

function static() {
  return gulp
    .src(["src/index.html", "src/favicon.ico", "src/img/**"])
    .pipe(gulp.dest("./build"));
}

function styles() {
  return gulp
    .src("src/scss/app.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest("./build"));
}

function scripts() {
  return streamqueue({ objectMode: true }, gulp.src("./src/js/**/*.js"))
    .pipe(concat("app.js"))
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(gulp.dest("./build"));
}

function vendor() {
  return gulp.src("src/vendor/**/*").pipe(gulp.dest("./build/vendor"));
}

function clean() {
  return del(["build/.*", "build/**/*"]).then((paths) => {
    console.log("Deleted files and folders:\n", paths.join("\n"));
  });
}

gulp.task("build", build);
gulp.task("default", build);

gulp.task("watch", function () {
  gulp.watch("src/scss/**/*.scss", styles);
  gulp.watch("src/js/**/*.js", scripts);
  gulp.watch("src/vendor/**/*", vendor);
  gulp.watch("src/index.html", static);
});
