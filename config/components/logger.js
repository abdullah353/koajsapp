'use strict'

const joi = require('joi')
const winston = require('winston')

const envVarsSchema = joi.object({
  LOGGER_LEVEL: joi.string()
    .allow(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
    .default('info'),
  LOGGER_ENABLED: joi.boolean()
    .truthy('TRUE')
    .truthy('true')
    .falsy('FALSE')
    .falsy('false')
    .default(true)
}).unknown()
  .required()

const result = joi.validate(process.env, envVarsSchema)

if (result.error) {
  throw new Error(`Config validation error: ${result.error}`)
}

const config = {
  logger: {
    level: result.value.LOGGER_LEVEL,
    enabled: result.value.LOGGER_ENABLED
  }
}

winston.level = config.logger.level
if (!config.logger.enabled) {
  winston.remove(winston.transports.Console)
}

module.exports = config
