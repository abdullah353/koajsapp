/* global rootRequire */
'use strict'

// Global rootRequire to avoid ../../ in require arguments.
const path = require('path')
global.rootRequire = function (name) {
  logger.debug('Root Rquiring path = ' + path.join(__dirname, '/../', name))
  return require(path.join(__dirname, '/../', name))
}

const logger = require('winston')
const User = rootRequire('server/models/user')

logger.info(`Started building test facades.`)

// 1. valid user samples.
const validUserSamples = [
  {
    email: 'abc@gmail.com',
    password: '12345678',
    avatarUrl: 'http://thecatapi.com/api/images/get?format=src&type=jpg'
  },
  {
    email: 'abc123@gmail.com',
    password: '1(3@asd4d8',
    avatarUrl: 'http://thecatapi.com/api/images/get?format=src&type=jpg'
  }
]

// 2. Invalid users data samples.
const invalidUserSamples = [
  {
    email: 'invalidEmail',
    password: '1234',
    avatarUrl: 'http://xyz.com/t.png'
  },
  {
    password: '1234'
  },
  {
    email: 'xyz@xyz.com'
  },
  {
    avatarUrl: 'http://xyz.com/t.png'
  }
]

// 3. Helper function: delete user by email.
const delUserByEmail = async (email) => {
  try {
    await User.destroy({
      where: {
        email: email
      }
    })
    logger.debug('Destroyed user by email' + email)
  } catch (err) {
    logger.warn('Unable to delete user ' + err)
  }
}

// 4. Clean all sample users.
// *WARNING*: Use it carefully, make sure not to include 
//    original user email in test sample
const cleanSampleUsers = () => {
  for (let i in validUserSamples) {
    delUserByEmail(validUserSamples[i].email)
  }
}

// 5. fill DB with all valid users.
const fillSampleUsers = async () => {
  for (let i in validUserSamples) {
    try {
      await User.create(validUserSamples[i])
    } catch (err) {
      logger.error('Unable to store valid user into the database.' + validUserSamples[i])
      throw err
    }
  }
}

// Polluting global env, for running testcases.
// TODO: come up with better solution, like `require`
global.testFacades = {
  delUserByEmail: delUserByEmail,
  validUserSamples: validUserSamples,
  invalidUserSamples: invalidUserSamples,
  cleanSampleUsers: cleanSampleUsers,
  fillSampleUsers: fillSampleUsers
}
