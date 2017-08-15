/* global describe it afterEach testFacades */
'use strict'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const assert = chai.assert
const User = require('./user')

chai.use(chaiAsPromised)

describe('Model User', () => {
  it('should add only valid user into database.', async () => {
    // fill db with valid users.
    await testFacades.fillSampleUsers()

    for (let i in testFacades.validUserSamples) {
      let sampleUser = testFacades.validUserSamples[i]

      // Check if user actually inserted into the database.
      let userStored = await User.findOne({
        where: {
          email: sampleUser.email
        }
      })

      assert.isNotEmpty(userStored)
      assert.equal(userStored.email, sampleUser.email)
      // Password should be stored as hash.
      assert.notEqual(userStored.password, sampleUser.password)
    }
  })

  it('should not allow invalid user insertions into database.', async () => {
    for (let i in testFacades.invalidUserSamples) {
      let sampleUser = testFacades.invalidUserSamples[i]

      // Check Invalid User shouldn't be in database.
      let user = await User.findOne({
        where: {
          email: sampleUser.email
        }
      })
      assert.isNull(user)
    }
  })

  // Clean all samples from database.
  afterEach(() => testFacades.cleanSampleUsers())
})
