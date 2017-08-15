'use strict'

const hash = require('./hash')
const listDir = require('./listDir')

module.exports = Object.assign({}, hash, listDir)
