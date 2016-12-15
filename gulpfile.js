var gulp = require('gulp');
var print = require('gulp-print');
var del = require('del');
var vulcanize = require('gulp-vulcanize');
var polybuild = require('polybuild');
var imagemin = require('gulp-imagemin');
var BEATS = require('./package.json').beats;

gulp.task('default', function () {
    console.log("default task");
});

gulp.task('copy', function () {
    return gulp.src('src/**')
        .pipe(print())
        .pipe(gulp.dest('dst'));
});

gulp.task('clean', function () {
    return del([BEATS.distDir]);
});

gulp.task('vulcanize', function () {
    return gulp.src('home.html')
        .pipe(vulcanize())
        .pipe(gulp.dest(BEATS.distDir));
});

gulp.task('image:optimize', function () {
    return gulp.src('images/**/*')
        .pipe(imagemin({ progressive: true }))
        .pipe(gulp.dest(BEATS.distDir + '/images/'));
})

gulp.task('build', ['clean', 'image:optimize'], function () {
    return gulp.src(['index.html', 'story.html', 'about.html', 'sample.html', 'careers.html'])
        .pipe(polybuild({ maximumCrush: true, suffix: '' }))
        .pipe(gulp.dest(BEATS.distDir));
})

gulp.task('default', ['default']);