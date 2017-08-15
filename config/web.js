'use strict'

const logger = require('./components/logger')
const server = require('./components/server')
const api = require('./components/api')
const keys = require('./components/keys')

module.exports = Object.assign({}, logger, server, api, keys)
