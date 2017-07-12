'use strict';

var gulp        = require('gulp');
var eslint      = require('gulp-eslint');
var shrinkwrap  = require('gulp-shrinkwrap');
var gulpNSP     = require('gulp-nsp');
var gulpIf      = require('gulp-if');
var mocha       = require('gulp-mocha');
var istanbul    = require('gulp-istanbul');
var exit        = require('gulp-exit');
var codacy      = require('gulp-codacy');

gulp.task('lint', () => {
  return gulp.src(['index.js', 'lib/loopback-ssl.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('nsp', function(cb) {
  return gulpNSP({
    shrinkwrap: __dirname + '/npm-shrinkwrap.json',
    package: __dirname + '/package.json',
    output: 'default',
    stopOnError: false,
  }, cb);
});

gulp.task('shrinkwrap', function() {
  return gulp.src('./package.json')
    .pipe(shrinkwrap.lock())
    .pipe(gulp.dest('./'));
});

function isFixed(file) {
  return file.eslint != null && file.eslint.fixed;
}

gulp.task('test', function(cb) {
  gulp.src([
    'index.js',
    'lib/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function() {
      gulp.src([
        'test/**/*-test.js'])
        .pipe(mocha({timeout: 1000}))
        .pipe(istanbul.writeReports())
        .on('end', function() {
          cb();
        })
        .pipe(exit());
    });
});

gulp.task('codacy', function codacyTask() {
  return gulp
    .src(['./coverage/lcov.info'], {read: false})
    .pipe(codacy({
      token: '6364b0b53a1a4d5795c5aa4f2bd66857',
    }))
    ;
});

gulp.task('default', [
  'test',
  'lint',
  'nsp',
  'codacy',
], function() {});

gulp.task('build', ['default']);
