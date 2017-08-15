'use strict'

const logger = require('winston')

module.exports = (ctx) => {
  logger.info(ctx.state.user.email, 'user has logged out')
  ctx.logout()
  ctx.redirect('/login')
}
