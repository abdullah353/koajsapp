/* global rootRequire */
'use strict'

const User = rootRequire('server/models/user')

module.exports = async (ctx, next) =>
  (ctx.body = JSON.stringify(await User.all()))
