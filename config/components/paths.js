'use strict'

const path = require('path')

module.exports = {
  paths: {
    views: path.resolve('./server/resources/views/'),
    public: path.resolve('.'),
    routes: path.resolve('./server/routes/'),
    less: path.resolve('./server/resources/less/')
  }
}
