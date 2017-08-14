const crypto = require('crypto')
const secret = 'abcdefg'

const hash = (value) => {
  return crypto
    .createHmac('sha256', secret)
    .update(value)
    .digest('hex')
}

module.exports = {
  hash: hash
}
