/* global rootRequire */
'use strict'

const User = rootRequire('server/models/user')
const logger = require('winston')

module.exports = async (ctx, next) => {
  let users

  try {
    users = await User.all()
  } catch (err) {
    logger.error('Failed to receive all users.' + err)
    ctx.status = 500
    ctx.body = 'Failed'
  }

  ctx.body = JSON.stringify(users)
}
