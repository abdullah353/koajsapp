'use strict'

const joi = require('joi')

const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 8080

// Defining Schema for Environment variables.
const envSchema = {
    NODE_ENV: joi.string()
        .allow(['development', 'production'])
        .required(),

    PORT: joi.number()
        .required()
}

// Currently adjusted env.
let currentEnv = {
    NODE_ENV: env,
    PORT: port,
}

const result = joi.validate(currentEnv, envSchema)

if (result.error) {
    throw new Error(`Config validation error: ${result.error}`)
}

module.exports = {
    server: {
        env: result.value.NODE_ENV,
        port: result.value.PORT
    }
}