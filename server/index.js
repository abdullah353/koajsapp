/* global rootRequire */
'use strict'

const logger = require('winston')
const router = require('./routes')
const Koa = require('koa')
const views = require('koa-views')
const passport = require('koa-passport')
const serve = require('koa-static')
const config = rootRequire('config')
const session = require('koa-session')
require('./auth')

const app = new Koa()

logger.info('Starting app with config as ' + JSON.stringify(config))

// Serving public assets.
app.use(serve(config.paths.public))

// EJS template renderer.
app.use(views(
  config.paths.views,
  { extension: 'ejs' }
))

// configuring sessions
app.keys = [config.keys.session]
app.use(session({}, app))

// flash messages.
app.use((ctx, next) => {
  ctx.flash = (type, msg) => {
    ctx.session.flash = { type: type, message: msg }
  }
  return next()
})

// authentication module.
app.use(passport.initialize())
app.use(passport.session())

// Registering all routes.
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(config.server.port)
