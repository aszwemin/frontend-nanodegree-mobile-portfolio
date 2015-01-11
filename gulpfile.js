// Automatically do some optimizations like js minification and concatenation,
// styles minification and concatenation and image optimizing

// include gulp
var gulp = require('gulp');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
 
// include plug-ins
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
 
// JS hint task
gulp.task('jshint', function() {
  gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './img/**/*',
      imgDst = './build/img';
 
  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

// minify new images in pizzeria
gulp.task('imagemin1', function() {
  var imgSrc = './views/images/**/*',
      imgDst = './views/build/images';
 
  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['./js/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});

// JS concat, strip debugging and minify
gulp.task('scripts1', function() {
  gulp.src(['./views/js/main.js'])
    .pipe(uglify())
    .pipe(gulp.dest('./views/build/js/'));
});

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src(['./views/css/*.css'])
    .pipe(concat('styles.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./views/build/css/'));
});

// default gulp task
gulp.task('default', ['imagemin', 'imagemin1', 'scripts', 'scripts1', 'styles'], function() {
});
