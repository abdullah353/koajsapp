/* global describe it rootRequire */
'use strict'

const listDir = require('./listDir')
const chai = require('chai')
const config = rootRequire('config')
const assert = chai.assert

describe('Core listDir functionality', () => {
  it('It should list all child dirs with depth 1.', async () => {
    let dirs = listDir.listDir(config.paths.routes)
    let route = ['api', 'login', 'dashboard']
    route.forEach((el) =>
      assert.include(dirs, el))
  })
})
