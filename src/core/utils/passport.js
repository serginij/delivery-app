const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../modules/user/user.model');
const { decryptPassword } = require('./bcrypt');

/**
 * @param {String} email
 * @param {String} password
 * @param {Function} done
 */
const verifyUser = async (email, pwd, done) => {
  try {
    const user = await User.findOne({ email }).select('-__v').lean();

    if (!user) {
      return done(null, false);
    }
    const { password, ...userData } = user;

    if (!(await decryptPassword(password, pwd))) {
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
    const user = await User.findById(id).select('-__v').lean();
    cb(null, user);
  } catch (err) {
    return cb(err);
  }
});
