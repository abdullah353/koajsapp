'user strict'

const postReq = require('./post')
const logger = require('winston')
const User = rootRequire('server/models/user')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const assert = chai.assert

describe('POST /user', () => {
  // Test Samples for user model.
  const validUserSample = {
    'email': 'abc@gmail.com',
    'password': '12345678',
    'avatarUrl': 'http://thecatapi.com/api/images/get?format=src&type=jpg'
  }

  // faking koa-router context object.
  const ctx = {
    "request": {
      "body": validUserSample
    }
  }

  beforeEach(async () => {
    ctx.request.body = validUserSample
    logger.info("ctx" + ctx)
  })

  it('should return all users json in body.', async () => {
    await postReq(ctx, () => {})
    // Body should be string.
    assert.isString(ctx.body)
    assert.equal('{"message":"User added successfully."}', ctx.body)

  })
})