'user strict'

const getReq = require('./get')
const logger = require('winston')
const User = rootRequire('server/models/user')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const assert = chai.assert

describe('GET /user', () => {
  // Mocking koa-router context object.
  const ctx = {}

  beforeEach(async () => {
    await testFacades.fillSampleUsers()
  })

  it('should return all users json in body.', async () => {
    await getReq(ctx, () => {})
    // Body should be string.
    assert.isString(ctx.body)

    let body = JSON.parse(ctx.body)
    let users = body.map((user) => user.email)

    for (let i in testFacades.validUserSamples) {
      let userSample = testFacades.validUserSamples[i]
        // Body must contain sample user.
        assert.deepInclude(users, userSample.email)
    }
  })


  // Clean all samples from database.
  afterEach(async () => await testFacades.cleanSampleUsers())
})