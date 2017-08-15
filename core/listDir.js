'use strict'

const fs = require('fs')

const listDir = p => fs
  .readdirSync(p)
  .filter(
    f => fs
      .statSync(p + '/' + f)
      .isDirectory()
  )

module.exports = {
  listDir: listDir
}
