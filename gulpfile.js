'use strict'

const gulp = require('gulp')
const nodemon = require('gulp-nodemon')

// Daemon for keep running Our Appliction.
gulp.task('nodemon', () => {
  nodemon({
    script: 'index.js',
    env: { 'PORT': '8082' },
    nodeArgs: ['--harmony']
  }).on('restart');
})

// Default Tasks.
gulp.task('default', ['nodemon'])