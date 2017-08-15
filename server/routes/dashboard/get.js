'use strict'

const logger = require('winston')

module.exports = async (ctx) => {
  logger.info(ctx.state.user.email, 'user signed in.')

  try {
    return await ctx.render('dashboard', {
      'email': ctx.state.user.email,
      'dateCreated': ctx.state.user.createdAt,
      'avatar': ctx.state.user.avatarUrl
    })
  } catch (err) {
    logger.error(err)
    throw err
  }
}
