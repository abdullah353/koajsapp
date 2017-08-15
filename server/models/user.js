/* global rootRequire */
'use strict'

const core = rootRequire('core')
const Sequelize = require('sequelize')

// Initilizing Database.
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database/db.sqlite'
})

// Defining schema and validations for our User model.
const schema = {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
    validate: {
      isEmail: {
        args: true,
        msg: 'Invalid email address provided.'
      },
      notEmpty: {
        msg: 'Email can not be empty.'
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
    validate: {
      notEmpty: {
        msg: 'Password can not be empty.'
      }
    }
  },
  avatarUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
    validate: {
      isUrl: {
        arg: true,
        msg: 'avatar should be a url.'
      },
      notEmpty: {
        msg: 'AvatarUrl can not be empty.'
      }
    }
  }
}

// Adding constraints to user table in database.
const options = {
  timestamps: true,
  'indexes': [{
    unique: true,
    fields: ['email']
  }]
}

let User = sequelize.define('user', schema, options)

// Automatically hash password, Before storing it into DB.
User.beforeCreate((user, options) => {
  user.password = core.hash(user.password)
})

// Add Url to database.
User.beforeValidate((user, options) => {
  user.avatarUrl = 'http://thecatapi.com/api/images/get?format=src&type=jpg'
})

// Authenticate provided password with the hash password.
User.prototype.authenticate = function (passwordToMatch) {
  return core.hash(passwordToMatch) === this.password
}

module.exports = User
