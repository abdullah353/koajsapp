'use strict'

const User = rootRequire('server/models/user')
const logger = require('winston')

module.exports = async (ctx, next) => {
  let requestBody = ctx.request.body

  // Create Model from the post request body recevied.
  try {
    logger.debug("Registering user "+ JSON.stringify(requestBody))

    // #NOTE: Create Method perform the following operations in sequence:
    // 1. Run validations defined for the mode. /server/models/user.js
    //  if anything validation fails we end up in catch.
    //  
    // 2. Run after and before Hooks, defined for models.
    // 3. If all passes then run the DB insert command.
    await User.create(requestBody)
  } catch (err) {
    logger.warn("Failed to register new user, reasons were "+ err)

    // TODO: set http response status, to appropriate value.
    ctx.status = 400

    // return error to client. {'status': 'f'}
    return ctx.body = JSON.stringify({
      errors: err.errors.map((error) => error.message)
    })
  }
  
  ctx.body = JSON.stringify({
    "message": "User added successfully."
  })
}
