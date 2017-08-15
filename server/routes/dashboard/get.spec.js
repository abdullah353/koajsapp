/* global describe it */
'user strict'

const getReq = require('./get')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const assert = chai.assert
const sinon = require('sinon')

chai.use(chaiAsPromised)

describe('GET /dashboard', () => {
  // Mocking koa-router context object.
  const ctx = {
    state: {
      user: {
        email: 'test@test.test',
        createdAt: 'some time',
        avatarUrl: 'some url'
      }
    },
    render: (view, arg) => false
  }

  const renderSpy = sinon.spy(ctx, 'render')

  it('should render view.', async () => {
    await getReq(ctx, () => {})
    // Body should be string.
    assert.equal(renderSpy.callCount, 1)
    assert.equal(renderSpy.firstCall.args[0], 'dashboard')
    renderSpy.restore()
  })
})
