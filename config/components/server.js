'use strict'

const joi = require('joi')

const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 8080
const host = process.env.HOST || 'localhost'

// Defining Schema for Environment variables.
const envSchema = {
  NODE_ENV: joi.string()
    .allow(['development', 'production'])
    .required(),

  PORT: joi.number()
    .required(),

  HOST: joi.string()
    .required()
}

// Currently adjusted env.
let currentEnv = {
  NODE_ENV: env,
  PORT: port,
  HOST: host
}

const result = joi.validate(currentEnv, envSchema)

if (result.error) {
  throw new Error(`Config validation error: ${result.error}`)
}

module.exports = {
  server: {
    env: result.value.NODE_ENV,
    port: result.value.PORT,
    host: result.value.HOST
  }
}
