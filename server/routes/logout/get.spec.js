/* global describe it */
'user strict'

const getReq = require('./get')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const assert = chai.assert
const sinon = require('sinon')

chai.use(chaiAsPromised)

describe('GET /logout', () => {
  // Mocking koa-router context object.
  const ctx = {
    state: {
      user: {
        email: 'test@test.test'
      }
    },
    logout: () => false,
    redirect: (path) => false
  }

  const logoutSpy = sinon.spy(ctx, 'logout')
  const redirectSpy = sinon.spy(ctx, 'redirect')

  it('should render view.', async () => {
    await getReq(ctx, () => {})
    // Body should be string.
    assert.equal(logoutSpy.callCount, 1)
    assert.equal(redirectSpy.callCount, 1)
    assert.equal(redirectSpy.firstCall.args[0], '/login')
    logoutSpy.restore()
    redirectSpy.restore()
  })
})
