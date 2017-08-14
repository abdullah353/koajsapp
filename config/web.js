'use strict'

const logger = require('./components/logger')
const server = require('./components/server')
const api = require('./components/api')

module.exports = Object.assign({}, logger, server, api)
