/* global rootRequire */

const crypto = require('crypto')
const config = rootRequire('config')

const hash = (value) => crypto
  .createHmac('sha256', config.keys.secret)
  .update(value)
  .digest('hex')

module.exports = {
  hash: hash
}
