const { src, dest, watch, series, parallel } = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create();

// File Path Variables
const files ={
    scssPath: 'src/scss/**/*.scss',
    jsPath: 'src/js/**/*.js'
}

// Sass task
function scssTask() {
    return src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer(), cssnano() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist')
    );
}

// JS task
function jsTask() {
    return src(files.jsPath)
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest('dist'));
}

// Watch task
function watchTask(){
    watch([files.scssPath, files.jsPath],
        parallel(scssTask, jsTask));
}

//Default task
exports.default = series(
    parallel(scssTask, jsTask),
    watchTask
);