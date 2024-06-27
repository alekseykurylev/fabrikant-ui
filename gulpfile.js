import gulp from 'gulp';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import sassGlob from 'gulp-sass-glob';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import terser from 'gulp-terser';
import csso from 'postcss-csso';
import browser from 'browser-sync';

const sass = gulpSass(dartSass);

// UIkit Style

export const uikitStyle = () => gulp.src('src/uikit/styles/sass/uikit.scss')
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([csso]))
    .pipe(rename('uikit.min.css'))
    .pipe(gulp.dest('dist/uikit'))
    .pipe(browser.stream());

// UIkit Script

export const uikitScript = (done) => {
  gulp.src('node_modules/uikit/dist/js/uikit.min.js').pipe(gulp.dest('dist/uikit'));
  gulp
    .src('src/uikit/js/uikit-icons.js')
    .pipe(terser())
    .pipe(rename('uikit-icons.min.js'))
    .pipe(gulp.dest('dist/uikit'));
  done();
};

// Components Style

export const componentsStyle = () => gulp.src(['src/components/**/*.scss'])
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([csso]))
    .pipe(gulp.dest('dist/components'))
    .pipe(browser.stream());

// Components Script

export const componentsScript = () => gulp.src(['src/components/**/*.js'])
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(terser())
    .pipe(gulp.dest('dist/components'))
    .pipe(browser.stream());

// All Style

export const allStyle = () => gulp.src('src/index.scss')
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([csso]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browser.stream());

// Watcher

export const watcher = () => {
  gulp.watch('src/uikit/styles/**/*.scss', gulp.series(uikitStyle));
  gulp.watch('src/uikit/js/*.js', gulp.series(uikitScript));

  gulp.watch('src/**/*.scss', gulp.series(componentsStyle));
  gulp.watch('src/**/*.js', gulp.series(componentsScript));

  gulp.watch('src/**/*.scss', gulp.series(allStyle));

  gulp.watch('src/**/*.scss').on('change', browser.reload);
  gulp.watch('src/**/*.js').on('change', browser.reload);
  gulp.watch('dist/**/*.html').on('change', browser.reload);
};

// Server

export const server = (done) => {
  browser.init({
    server: {
      baseDir: './dist'
    },
    cors: true,
    notify: false,
    ui: false
  });
  done();
};

// Default
export default gulp.series(server, uikitScript, uikitStyle, componentsStyle, componentsScript, allStyle, watcher);
