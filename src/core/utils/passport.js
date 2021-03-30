const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { decryptPassword } = require('./bcrypt');

const { findByEmail, findById } = require('../modules/user/user.module');

/**
 * @param {String} email
 * @param {String} password
 * @param {Function} done
 */
const verifyUser = async (email, pwd, done) => {
  try {
    const user = await findByEmail(email);

    if (!user) {
      return done(null, false);
    }
    const { passwordHash, ...userData } = user;

    if (!(await decryptPassword(passwordHash, pwd))) {
      return done(null, false);
    }

    return done(null, userData);
  } catch (err) {
    return done(err);
  }
};

const passportOptions = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: false,
};

passport.use('local', new LocalStrategy(passportOptions, verifyUser));

passport.serializeUser(function (user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await findById(id);
    cb(null, user);
  } catch (err) {
    return cb(err);
  }
});
