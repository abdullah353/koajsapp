'use strict'

const api = require('./api')
const config = rootRequire('config')
const Router = require('koa-router')
const koaBody = require('koa-body')()

const router = new Router()

// Add your routes in following sections.
// Get Methods.
router.get(`${config.api.prefix}/user`, api.v1.user.get);

//Post Methods.
router.post(`${config.api.prefix}/user`, koaBody, api.v1.user.post);

module.exports = router