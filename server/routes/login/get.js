'use strict'

const logger = require('winston')

module.exports = async (ctx) => {
  let alerts = {
    errors: [],
    message: null
  }

  if (ctx.session.flash && ctx.session.flash.message) {
    alerts.errors.push(ctx.session.flash.message)
    ctx.session.flash.message = null
  }

  try {
    return await ctx.render('login', alerts)
  } catch (err) {
    logger.error(err)
    throw err
  }
}
