/* global describe it beforeEach afterEach */

'use strict'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const assert = chai.assert

chai.use(chaiAsPromised)

const User = require('./user')

// Test Samples for user model.
const validUserSample = {
  'email': 'abc@gmail.com',
  'password': '12345678',
  'avatarUrl': 'http://thecatapi.com/api/images/get?format=src&type=jpg'
}

const invalidUserSamples = [
  {
    'email': 'invalidEmail',
    'password': '1234',
    'avatarUrl': 'http://xyz.com/t.png'
  },
  {
    'email': 'xyz@xyz.com',
    'password': '1234',
    'avatarUrl': 'invalidUrl'
  },
  {
    'password': '1234'
  },
  {
    'email': 'xyz@xyz.com'
  },
  {
    'avatarUrl': 'http://xyz.com/t.png'
  }
]

describe('Model User', () => {
  beforeEach(async () => {
    // Adding User into database.
    await User.create(validUserSample)
  })

  it('should add only valid user into database.', async () => {
    let user

    try {
      user = await User.findOne({where: {email: 'abc@gmail.com'}})
    } catch (err) {
      assert.fail('Unable to fetch user from database.')
    }

    assert.equal(user.email, validUserSample.email)
    assert.equal(user.avatarUrl, validUserSample.avatarUrl)
  })

  it('should not allow invalid user insertions into database.', async () => {
    for (let user in invalidUserSamples) {
      try {
        await User.create(user)
        assert.fail('Should not store invalid user.')
      } catch (err) {
        assert.isOk('User not valid.')
      }
    }
  })

  afterEach(async () => {
    // Cleaning tests insertions.
    await User.destroy({
      where: {
        email: validUserSample.email
      }
    })
  })
})
