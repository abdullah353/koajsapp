/* global rootRequire */
'use strict'

const crypto = require('crypto')
const config = rootRequire('config')

const hash = (value) => {
  return crypto.createHmac('sha256', config.keys.secret)
    .update(value)
    .digest('hex')
}

module.exports = {
  hash: hash
}
