/* global rootRequire */

'use strict'

const passport = require('koa-passport')
const User = rootRequire('models/user')
const LocalStrategy = require('passport-local').Strategy

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

passport.use(new LocalStrategy(async function (email, password, done) {
  let user

  try {
    user = await User.findOne({ where: {email: email} })
  } catch (err) {
    console.error(err)
    done(err)
  }

  if (user && user.authenticate(password)) {
    done(null, user)
  } else {
    done(null, false, { message: 'bad credentials' })
  }
}))

// const FacebookStrategy = require('passport-facebook').Strategy
// passport.use(new FacebookStrategy({
//     clientID: 'your-client-id',
//     clientSecret: 'your-secret',
//     callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/facebook/callback'
//   },
//   function(token, tokenSecret, profile, done) {
//     // retrieve user ...
//     fetchUser().then(user => done(null, user))
//   }
// ))

// const TwitterStrategy = require('passport-twitter').Strategy
// passport.use(new TwitterStrategy({
//     consumerKey: 'your-consumer-key',
//     consumerSecret: 'your-secret',
//     callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/twitter/callback'
//   },
//   function(token, tokenSecret, profile, done) {
//     // retrieve user ...
//     fetchUser().then(user => done(null, user))
//   }
// ))

// const GoogleStrategy = require('passport-google-auth').Strategy
// passport.use(new GoogleStrategy({
//     clientId: 'your-client-id',
//     clientSecret: 'your-secret',
//     callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/google/callback'
//   },
//   function(token, tokenSecret, profile, done) {
//     // retrieve user ...
//     fetchUser().then(user => done(null, user))
//   }
// ))
