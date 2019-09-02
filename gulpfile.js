/* global require module */

const sourceDir = 'src',
    outputDir = 'build';

const gulp = require('gulp'),
    del = require('del'),
    gulpSourceMaps = require('gulp-sourcemaps'),
    gulpBabel = require('gulp-babel'),
    gulpUglify = require('gulp-uglify'),
    gulpEslint = require('gulp-eslint');

const clean = done =>
    del([outputDir], done);

const scriptsDebug = () =>
    gulp.src(`${sourceDir}/**/*.js`)
        .pipe(gulpSourceMaps.init())
        .pipe(gulpBabel())
        .pipe(gulpSourceMaps.write('.'))
        .pipe(gulp.dest(`${outputDir}/`));

const scripts = () =>
    gulp.src(`${sourceDir}/**/*.js`)
        .pipe(gulpBabel())
        .pipe(gulpUglify())
        .pipe(gulp.dest(`${outputDir}/`));

const lint = () =>
    gulp.src(`${sourceDir}/**/*.js`)
        .pipe(gulpEslint())
        .pipe(gulpEslint.format())
        .pipe(gulpEslint.failAfterError());

const debug = gulp.series(
    clean,
    scriptsDebug,
    lint
);

const build = gulp.series(
    clean,
    scripts
);

const develop = () => {
    gulp.watch(
        [
            `${sourceDir}/**/*.js`
        ],
        gulp.series(
            scriptsDebug,
            lint
        )
    );
};

module.exports = {
    debug,
    build,
    develop,
    lint,
    default: build
};
