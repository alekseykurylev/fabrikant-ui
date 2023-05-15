import gulp from "gulp";
import plumber from "gulp-plumber";
import sass from "gulp-dart-sass";
import csso from "gulp-csso";
import rename from "gulp-rename";
import browser from "browser-sync";

// Styles

export const styles = () => {
  return gulp
    .src("src/sass/style.scss")
    .pipe(plumber())
    .pipe(sass().on("error", sass.logError))
    .pipe(csso())
    .pipe(rename("fabrikant-ui.min.css"))
    .pipe(gulp.dest("src/css"))
    .pipe(browser.stream());
};

// Copy script

const copy = (done) => {
  gulp.src("node_modules/uikit/dist/js/uikit.min.js").pipe(gulp.dest("src/js"));
  done();
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: "src",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

// Watcher

const watcher = () => {
  gulp.watch("src/sass/**/*.scss", gulp.series(styles));
  gulp.watch("src/*.html").on("change", browser.reload);
};

export default gulp.series(styles, copy, server, watcher);
