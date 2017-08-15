/* global describe it */
'use strict'

const hash = require('./hash')
const chai = require('chai')
const assert = chai.assert

describe('Core Hash functionality', () => {
  it('should hash given string against a key.', async () => {
    const password = '12345'
    assert.notEqual(hash.hash(password), password)
  })
})
