import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import uglify from 'gulp-uglify';
import bs from 'browser-sync';
import imagemin from 'gulp-imagemin';
import {gifsicle, mozjpeg, optipng, svgo} from 'gulp-imagemin';
import del from 'del';

const scss = gulpSass(dartSass);
const browserSync = bs.create();


// Server 

export const server = () => {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  });
};

// Remove 

export const clearDist = () => {
  return del('dist');
}

// Styles 

export const styles = () => {
  return gulp.src('app/scss/style.scss')
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
};

// Scripts

export const scripts = () => {
  return gulp.src('app/js/main.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.stream());
};

// Images 

export const images = () => {
  return gulp.src('app/images/**/*.*')
    .pipe(imagemin([
      gifsicle({interlaced: true}),
      mozjpeg({quality: 75, progressive: true}),
      optipng({optimizationLevel: 5}),
      svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('dist/images'));
}

// Build

let copyToDist = () => {
  return gulp.src([
    'app/**/*.html',
    'app/js/**/*min.js',
    'app/css/**/*.css'
  ], {base: 'app'})
  .pipe(gulp.dest('dist/'))
}

export const build = gulp.series(clearDist, images, copyToDist);

// Watcher

export const watch = () => {
  gulp.watch(['app/scss/**/*.scss'], styles);
  gulp.watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  gulp.watch(['app/**/*html']).on('change', browserSync.reload);
};


export default gulp.series(
  gulp.parallel(styles, scripts, server, watch)
)
