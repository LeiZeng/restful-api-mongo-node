import mongoose from 'mongoose'
import restify from 'restify'
import passport from 'passport'
import sessions from 'client-sessions'
import { Strategy } from 'passport-local'

const User = mongoose.model('User')

export default (server) => {
  server.use(sessions({
      // cookie name dictates the key name added to the request object
      cookieName: 'session-wechat-app-server',
      // should be a large unguessable string
      secret: 'blablalala',
      // how long the session will stay valid in ms
      duration: 365 * 24 * 60 * 60 * 1000
  }))
  server.use(passport.initialize())
  server.use(passport.session())

  // This is how a user gets serialized
  passport.serializeUser((user, done) => {
    console.log('serialized', user);
    done(null, user.id)
  })

  // This is how a user gets deserialized
  passport.deserializeUser((id, done) => {
    console.log('de serialized', id);
    done(null, {id:'123456', username:'john'})
  });

  passport.use(
    new Strategy(
      { usernameField: 'username', session: true },
      (username, password, done) => {
          User.auth(username, password)
          .then(user => {
            user ? done(null, user): done(null, false, { error: 'Incorrect username or password.' })
          })
      }
    )
  );
}
