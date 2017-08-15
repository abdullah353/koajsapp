/* global describe it afterEach testFacades */
'use strict'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const assert = chai.assert
const User = require('./user')
const logger = require('winston')

chai.use(chaiAsPromised)

describe('Model User', () => {
  it('should add only valid user into database.', async () => {
    // fill db with valid users.
    await testFacades.fillSampleUsers()

    for (let i in testFacades.validUserSamples) {
      let userStored
      let sampleUser = testFacades.validUserSamples[i]

      try {
        userStored = await User.findOne({
          where: {
            email: sampleUser.email
          }
        })
      } catch (err) {
        logger.error('Unable to store the valid user ' + err)
        assert.fail('Unable to store the valid user ' + err)
      }

      assert.equal(userStored.email, sampleUser.email)
      // Password should be stored as hash.
      assert.notEqual(userStored.password, sampleUser.password)
    }
  })

  it('should not allow invalid user insertions into database.', async () => {
    for (let i in testFacades.invalidUserSamples) {
      let sampleUser = testFacades.invalidUserSamples[i]

      try {
        await User.create(sampleUser)
        assert.fail('Should not store invalid user.')
      } catch (err) {
        assert.isOk('User not valid.')
      }
    }
  })

  // Clean all samples from database.
  afterEach(() => testFacades.cleanSampleUsers())
})
