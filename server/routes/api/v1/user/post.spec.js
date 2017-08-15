/* global rootRequire describe it afterEach testFacades */
'user strict'

const postReq = require('./post')
const User = rootRequire('server/models/user')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const assert = chai.assert

chai.use(chaiAsPromised)

describe('POST /user', () => {
  // Mocking HTTP form request received.
  const ctx = {
    request: {
      body: {}
    }
  }

  it('allow valid form request to create new user.', async () => {
    for (let i in testFacades.validUserSamples) {
      let sampleUser = testFacades.validUserSamples[i]

      // Mocking form request.
      ctx.request.body = sampleUser

      // Send POST request.
      await postReq(ctx, () => {})

      // Body should be string.
      assert.isString(ctx.body)
      assert.equal('{"message":"User added successfully."}', ctx.body)

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

  it('Block invalid requests from creating user.', async () => {
    for (let i in testFacades.invalidUserSamples) {
      let sampleUser = testFacades.invalidUserSamples[i]

      // Mocking form request.
      ctx.request.body = sampleUser

      // Send POST request.
      await postReq(ctx, () => {})

      // Body should be string, status code is 400, and it should has errors.
      assert.isString(ctx.body)
      assert.equal(ctx.status, 400)
      assert.hasAnyKeys(JSON.parse(ctx.body), ['errors'])

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
