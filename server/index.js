/* global rootRequire */
'use strict'

const logger = require('winston')
const router = require('./routes')
const Koa = require('koa')
const config = rootRequire('config')

const app = new Koa()

logger.info('Starting app config=' + JSON.stringify(config))

// Registering Routes, to application.
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(config.server.port)
