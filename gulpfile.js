'use strict'

const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const run = require('gulp-run')
const watch = require('gulp-watch')

// Daemon for keep running Our Appliction.
gulp.task('nodemon', () => {
  nodemon({
    script: 'index.js',
    env: { 'PORT': '8082' },
    nodeArgs: ['--harmony']
  }).on('restart');
})

// Fix for watch to keep runnning on failure
// https://github.com/gulpjs/gulp/issues/259
let handleError = (err) => console.log(err.toString())

// Run test cases on startup.
gulp.task('tests', () => run('npm test').exec()
  .on('error', handleError))

// Keep an eye on any changes, and live rebuild/test it.
gulp.task('liveBuild', () => {

    watch('./**/*.js', () => run('npm run linter -- --fix')
      .exec()
      .on('error', handleError))

    watch('./**/*.js', () => run('npm test').exec()
      .on('error', handleError))
})

// Default Tasks.
gulp.task('default', ['tests', 'liveBuild', 'nodemon'])