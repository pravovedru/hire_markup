var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    data = require('gulp-data'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    cleanCSS = require('gulp-clean-css');

var path = {
    build: {
        html: 'build/',
        css: 'build/css/',
        js: 'build/js/',
        images: 'build/images/'
    },
    src: {
        pug: 'src/pug/*.pug',
        style: 'src/scss/main.scss',
    },
    watch: {
        pug: 'src/pug/**/*.pug',
        style: 'src/scss/**/*.*',
        js: 'src/js/**/*.*'
    },
    clean: './build'
};

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('html:build', function () {
    gulp.src(path.src.pug)
        .pipe(data(function (file) {
            return require('./src/pug/data/project-data.json');
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({errLogToConsole: true}))
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    return gulp.src([
        'src/libs/jquery/dist/jquery.min.js',
        'src/js/common.js',
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(sourcemaps.write())
        // .pipe(uglify()) // Минимизировать весь js (на выбор)
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('imagemin', function () {
    return gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.images));
});


gulp.task('build', [
    'html:build',
    'style:build',
    'js:build',
    'imagemin'
]);

gulp.task('watch', function () {

    watch([path.watch.pug], function (event, cb) {
        gulp.start('html:build');
    });

    watch([path.watch.style], function (event, cb) {
        gulp.start('style:build');
    });

    watch([path.watch.js], function (event, cb) {
        gulp.start('js:build');
    });

});

gulp.task('default', ['watch', 'browser-sync']);