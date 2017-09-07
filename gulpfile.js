"use strict";

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    browserSync = require("browser-sync").create(),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    cssMinify = require('gulp-clean-css'),
    jsMinify = require('gulp-uglify'),
    mq = require('gulp-combine-mq');

var paths = {
    build:  'build',
    source: 'src',
    html:   'src/html/',
    style:  'src/less/main.less',
    js:     'src/js/**/*',
    images: 'src/img/**/*',
};

var watch = {
    html:   'src/html/**/*',
    style:  'src/less/**/*',
    js:     'src/js/**/*',
    images: 'src/img/**/*',
    ico:    'src/ico/**/*'
};


var jsVendor = [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/jquery.rateit/scripts/jquery.rateit.js'
];

var jsMain = [
    paths.source + '/js/main.js'
];

gulp.task('build', [
  'build-html',
  'build-css',
  'build-js',
  'build-img',
]);

// DEL
gulp.task('clean', function () {
    del.sync(paths.build);
});

// HTML
gulp.task('build-html', function(){
  return gulp.src(paths.html + '*.html')
      .pipe(gulp.dest(paths.build));
});

// Less build
gulp.task('build-css', function(){
  return gulp.src(paths.style)
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(mq({
            beautify: true
        }))
        .pipe(cssMinify())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest(paths.build + '/css'));
});

// JS build
gulp.task('build-main-js', function() {
  return gulp.src(jsMain)
        .pipe(concat('main.js', {newLine: ';'}))
        .pipe(jsMinify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest(paths.build +'/js'));
});

gulp.task('build-js', ['build-main-js'], function() {
  return gulp.src(jsVendor)
        .pipe(concat('vendor.js', {newLine: ';'}))
        .pipe(jsMinify())
        .pipe(rename('vendor.min.js'))
        .pipe(gulp.dest(paths.build +'/js'));
});

// Img build
gulp.task('build-img', function(){
  return gulp.src(paths.images + '.{jpg,png,svg,ico,gif}')
        .pipe(gulp.dest(paths.build + '/img'));
});

//Watch
gulp.task('html-watch', ['build-html'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('css-watch', ['build-css'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('js-watch', ['build-js'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('img-watch', ['build-img'], function (done) {
    browserSync.reload();
    done();
});

// browser-sync
gulp.task('default', ['clean', 'build-html', 'build-css', 'build-js', 'build-img'], function () {

  browserSync.init({
    port: 8888,
    // open: true,
    // notify: true,
    // browser: 'default',
    reloadDelay: 1000,
    // minify: false,
    server: {
      baseDir: paths.build,
	  index: "index.html"
    }
  });

  gulp.watch(watch.html, ['html-watch']);
  gulp.watch(watch.style, ['css-watch']);
  gulp.watch(watch.js, ['js-watch']);
  gulp.watch(watch.images, ['img-watch']);

});
