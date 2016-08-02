'use strict';

var gulp        = require('gulp');
var eslint      = require('gulp-eslint');
var shrinkwrap  = require('gulp-shrinkwrap');
var gulpNSP     = require('gulp-nsp');
var gulpIf      = require('gulp-if');
var mocha       = require('gulp-mocha');
var istanbul    = require('gulp-istanbul');

gulp.task('nsp', function(cb) {
  return gulpNSP({
    shrinkwrap: __dirname + '/npm-shrinkwrap.json',
    package: __dirname + '/package.json',
    output: 'default',
    stopOnError: false
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

gulp.task('lint', function() {
  var hasFixFlag = (process.argv.slice(2).indexOf('--fix') >= 0);
  return gulp.src([
    'index.js',
    'lib/**/*.js',
    '!node_modules/**'])
    .pipe(eslint({
      fix: hasFixFlag
    }))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest('./.fixtures')))
    .pipe(eslint.failAfterError());
});

gulp.task('test', function (cb) {
  gulp.src([
    'index.js',
    'lib/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src([
        'test/**/*-test.js'])
        .pipe(mocha({ timeout: 10000 }))
        .pipe(istanbul.writeReports())
        .on('end', function(){
          cb();
        });
    });
});


gulp.task('default', [
    'test',
    'lint',
    'shrinkwrap',
    'nsp'
  ], function() {});

gulp.task('build', ['default']);
