'use strict'

const passport = require('koa-passport')

module.exports = passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
})
