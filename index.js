/* eslint-disable global-require */

'use strict'

const path = require('path')

// Global rootRequire to avoid ../../ in require arguments.
global.rootRequire = function(name) {
    logger.debug("Root Rquiring path = "+ path.join(__dirname, '/', name))
    return require(path.join(__dirname, '/', name))
}

const logger = require('winston')

logger.info(`Starting server process`, { pid: process.pid })
require('./server')