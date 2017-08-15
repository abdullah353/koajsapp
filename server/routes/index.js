/* global rootRequire */
'use strict'

const config = rootRequire('config')
const Router = require('koa-router')
const core = rootRequire('core')
const koaBody = require('koa-body')()
// Auto importing all modules in routes.
const routes = {}
core
  .listDir(config.paths.routes)
  .map((el) => (routes[el] = require('./' + el)))

const router = new Router()

// Middleware to only allow access to signed in user.
const secureAccess = (ctx, next) =>
  ctx.isAuthenticated() ? next() : ctx.redirect('/login')

// Add your routes in following sections.
// Get Methods.
router.get('/', (ctx, next) => ctx.redirect('/dashboard'))
router.get(`${config.api.prefix}/user`, routes.api.v1.user.get)
router.get('/dashboard', secureAccess, routes.dashboard.get)
router.get('/login', routes.login.get)
router.get('/logout', routes.logout.get)
router.get('/register', routes.register.get)

// Post Methods.
router.post(`${config.api.prefix}/user`, koaBody, routes.api.v1.user.post)
router.post('/login', koaBody, routes.login.post)
router.post('/register', koaBody, routes.register.post)

const passport = require('koa-passport')
router.get('/auth/github', passport.authenticate('github'))
router.get('/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })
)

module.exports = router
