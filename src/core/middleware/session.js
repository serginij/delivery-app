module.exports = require('express-session')({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
});
