import gulp from 'gulp';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import rename from 'gulp-rename';
import postcss from 'gulp-postcss';
import terser from 'gulp-terser';
import minmax from 'postcss-media-minmax';
import csso from 'postcss-csso';
import browser from 'browser-sync';

// UIkit Style

export const uikitStyle = () => {
  return gulp
    .src('src/styles/sass/style.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([csso]))
    .pipe(rename('uikit.min.css'))
    .pipe(gulp.dest('src/styles'))
    .pipe(gulp.dest('dist/uikit'))
    .pipe(browser.stream());
};

// UIkit Script

export const uikitScript = (done) => {
  gulp.src('node_modules/uikit/dist/js/uikit.min.js').pipe(gulp.dest('src/js')).pipe(gulp.dest('dist/uikit'));
  gulp.src('src/js/uikit-icons.min.js').pipe(gulp.dest('dist/uikit'));
  done();
};

// Copy Style

export const copyStyle = () => {
  return gulp
    .src(['src/components/**/*.css', 'src/ui/**/*.css'])
    .pipe(postcss([minmax, csso]))
    .pipe(gulp.dest('dist/components'))
    .pipe(browser.stream());
};

// Copy Script

export const copyScript = () => {
  return gulp
    .src(['src/components/**/*.js', 'src/ui/**/*.js'])
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(terser())
    .pipe(gulp.dest('dist/components'))
    .pipe(browser.stream());
};

// Watcher

export const watcher = () => {
  gulp.watch('src/styles/**/*.scss', gulp.series(uikitStyle));
  gulp.watch('src/js/*.js', gulp.series(uikitScript));
  gulp.watch('src/**/*.css', gulp.series(copyStyle));
  gulp.watch('src/**/*.js', gulp.series(copyScript));
  gulp.watch('src/**/*.css').on('change', browser.reload);
  gulp.watch('src/**/*.js').on('change', browser.reload);
  gulp.watch('src/**/*.html').on('change', browser.reload);
};

// Server

export const server = (done) => {
  browser.init({
    server: {
      baseDir: './src'
    },
    cors: true,
    notify: false,
    ui: false
  });
  done();
};

export default gulp.series(uikitStyle, copyStyle, copyScript, watcher);
