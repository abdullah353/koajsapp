'use strict'

const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const less = require('gulp-less')
const concat = require('gulp-concat')
const run = require('gulp-run')
const watch = require('gulp-watch')
const config = require('./config')

// Daemon for keep running Our Appliction.
gulp.task('nodemon', () => {
  nodemon({
    script: 'index.js',
    env: { 'PORT': config.server.port },
    nodeArgs: ['--harmony']
  }).on('restart');
})

// Fix for watch to keep runnning on failure
// https://github.com/gulpjs/gulp/issues/259
let handleError = (err) => console.log(err.toString())

// compiling less into css.
let lessBuild = () => {
  console.log(config.paths.less + '/**/*.less')
  gulp.src(config.paths.less + '/**/*.less')
    .pipe(less({paths: [config.paths.less]}))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./public/css'))
}

// Run less compiler on startup.
gulp.task('less', lessBuild)

// Run test cases on startup.
gulp.task('tests', () => run('npm test')
  .exec()
  .on('error', handleError)
)

// Run linter to check code styling errors.
gulp.task('linter', () => run('npm run linter -- --fix')
  .exec()
  .on('error', handleError)
)

// Keep an eye on any changes, and live rebuild/test it.
gulp.task('liveBuild', () => {
  watch(config.paths.less + '/**/*.less', lessBuild)

  watch('./**/*.js', () => run('npm run linter -- --fix')
    .exec()
    .on('error', handleError))

  watch('./**/*.js', () => run('npm test').exec()
    .on('error', handleError))
})

// Default Tasks.
gulp.task('default', ['less', 'tests', 'linter', 'liveBuild', 'nodemon'])