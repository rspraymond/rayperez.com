'use strict';

var gulp = require('gulp'),
        sass = require('gulp-sass'),
        wrapper = require('gulp-wrapper'),
        browser = require('browser-sync'),
        cleanCSS = require('gulp-clean-css'),
        port = process.env.SERVER_PORT || 5000;


var sass_path = './src/sass/',
        theme_path = './src/theme/',
        build_path = './build/';

gulp.task('buildtheme', function () {
    gulp.src(theme_path + '**/*.*')
            .pipe(gulp.dest(build_path));
});

gulp.task('copysass', function () {
    return gulp.src(sass_path + '**/style.scss')
            .pipe(sass({includePaths:
                        [
                            './node_modules/foundation-sites/scss',
                            './node_modules/font-awesome/scss'
                        ]
            }))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(build_path));
});

gulp.task('staticfiles', function () {
    return gulp.src('./src/static/**/*.{html, js, css}')
            .pipe(wrapper({
                header: '<!DOCTYPE html><html><head><title>Raymond Perez – Denver Web Application Developer</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="style.css" type="text/css" rel="stylesheet"></head><body id="${filename}">',
                footer: '</body></html>\n'
            }))
            .pipe(gulp.dest(build_path));
});

gulp.task('copy', function () {
    copy_f('./src/img/**/*', 'img');
    copy_f('./node_modules/font-awesome/fonts/**/*', 'fonts');
});

gulp.task('open', function () {
    browser.init({
        server: build_path,
        port: port,
    });
});

gulp.task('default', ['copysass', 'staticfiles', 'copy', 'open'], function () {
    //Silence is golden.
});

var copy_f = function (src, dest) {

    if (typeof dest === 'undefined') {
        var dest = null;
    }

    gulp.src(src).pipe(gulp.dest(build_path + dest));
}