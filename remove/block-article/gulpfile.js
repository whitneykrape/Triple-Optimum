const gulp = require('gulp');

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const postcssNormalize = require('postcss-normalize');
const cssimport = require("gulp-cssimport");
const gulpAutoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
  return gulp.src('./src/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      compass: true,
      bundleExec: true    
    }))
    .pipe(gulpAutoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build')) // Outputs it in the css folder
})

// Watchers
gulp.task('watch', function() {
  gulp.watch('./src/**/*.scss', { usePolling: true }, gulp.series('sass'));
})

// Optimization Tasks 
// ------------------

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'sass',
    // ['useref', 'images', 'fonts'],
    ['useref'],
    callback
  )
})
