/* global rootRequire */

'use strict'

const path = require('path')
const logger = require('winston')
const router = require('./routes')
const Koa = require('koa')
const config = rootRequire('config')
const app = new Koa()

logger.info("Starting app config="+ JSON.stringify(config))

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(config.server.port)
