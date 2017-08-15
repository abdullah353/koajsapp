'use strict'

module.exports = async (ctx) => {
  let alerts = {
    'errors': [],
    'message': null
  }

  await ctx.render('register', alerts)
}
