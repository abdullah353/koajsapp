/* global describe it rootRequire */
'use strict'

const core = rootRequire('core')
const chai = require('chai')
const assert = chai.assert

describe('Core Hash functionality', () => {
  it('should hash given string against a key.', async () => {
    const password = '12345'
    assert.notEqual(core.hash(password), password)
  })
})
