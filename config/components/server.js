'use strict'

const joi = require('joi')

const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 8080

const envSchema = {
    NODE_ENV: joi.string()
        .allow(['development', 'production'])
        .required(),

    PORT: joi.number()
        .required()
}

let currentEnv = {
    NODE_ENV: env,
    PORT: port,
}

const result = joi.validate(currentEnv, envSchema)

if (result.error) {
    console.log(result.error)
    throw new Error(`Config validation error: ${result.error}`)
}

const config = {
    server: {
        env: result.value.NODE_ENV,
        port: result.value.PORT
    }
}

module.exports = config