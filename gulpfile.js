import gulp from "gulp";
import plumber from "gulp-plumber";
import sass from "gulp-dart-sass";
import rename from "gulp-rename";
import postcss from "gulp-postcss";
import csso from "postcss-csso";
import browser from "browser-sync";

// Styles

export const styles = () => {
  return gulp
    .src("src/styles/sass/style.scss")
    .pipe(plumber())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([csso]))
    .pipe(rename("fabrikant-ui.min.css"))
    .pipe(gulp.dest("src/styles"))
    .pipe(browser.stream());
};

// Copy script

// const copy = (done) => {
//   gulp.src("node_modules/uikit/dist/js/uikit.min.js").pipe(gulp.dest("src/js"));
//   gulp.src("node_modules/uikit/dist/js/uikit-icons-theme.min.js").pipe(gulp.dest("src/js"));
//   done();
// };

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: "./src",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

// Watcher

const watcher = () => {
  gulp.watch("src/styles/**/*.scss", gulp.series(styles));
  gulp.watch("src/components/**/*.css").on("change", browser.reload);
  gulp.watch("src/page/**/*.css").on("change", browser.reload);
  gulp.watch("src/**/**.html").on("change", browser.reload);
};

export default gulp.series(styles, server, watcher);
