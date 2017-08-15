/* global rootRequire */
'use strict'

const logger = require('winston')
const passport = require('koa-passport')
const User = rootRequire('./server/models/user')
const LocalStrategy = require('passport-local').Strategy
const GitHubStrategy = require('passport-github').Strategy
const config = rootRequire('config')

passport.serializeUser(function (user, done) {
  done(null, user.email)
})

passport.deserializeUser(async function (email, done) {
  try {
    const user = await User.findOne({ where: {email: email} })
    done(null, user)
  } catch (err) {
    done(err)
  }
})

let signInByEmail = async (email, password, done, validatePassword = true) => {
  let user

  try {
    user = await User.findOne({ where: {email: email} })
  } catch (err) {
    logger.error(err)
    done(err)
  }

  if (!validatePassword) {
    logger.warn('logging in without password check.')
    return user
      ? done(null, user)
      : done(null, false, {
        message: 'You have to register your email for one time.'
      })
  }

  (user && user.authenticate(password))
    ? done(null, user)
    : done(null, false, {message: 'bad credentials'})
}

passport.use(new LocalStrategy(async (email, password, done) => {
  signInByEmail(email, password, done)
}))

passport.use(new GitHubStrategy({
  clientID: config.keys.githubId,
  clientSecret: config.keys.githubSecret,
  callbackURL: `http://${config.server.host}:${config.server.port}/auth/github/callback`
},
(accessToken, refreshToken, profile, done) =>
  signInByEmail(profile.emails[0].value, null, done, false)
))
