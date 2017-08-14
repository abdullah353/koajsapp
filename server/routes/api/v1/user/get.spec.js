'user strict'

const getReq = require('./get')
const logger = require('winston')
const User = rootRequire('server/models/user')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const assert = chai.assert

// faking koa-router context object.
const ctx = {}

describe('GET /user', () => {
  // Test Samples for user model.
  const validUserSample = {
    'email': 'abc@gmail.com',
    'password': '12345678',
    'avatarUrl': 'http://thecatapi.com/api/images/get?format=src&type=jpg'
  }

  beforeEach(async () => {
    await User.create(validUserSample)
  })

  it('should return all users json in body.', async () => {
    await getReq(ctx, () => {})
    // Body should be string.
    assert.isString(ctx.body)

    let body = JSON.parse(ctx.body)
    let users = body.map((user) => user.email)
    // Body must contain sample user.
    assert.deepInclude(users, validUserSample.email)
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