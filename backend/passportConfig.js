const User = require("./user");
// unhashes passwords
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
// const { Strategy } = require("passport");

// passing passport library to use same instance of passport throughout entirety of application
module.exports = function (passport) {
    passport.use(
    // defining local strategy
      new localStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
          if (err) throw err;
        //   null -there is no error, false - there is no user
          if (!user) return done(null, false);
        //   if there is a user
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
            // if everything is good return user
              return done(null, user);
            } else {
            // password is not the same
              return done(null, false);
            }
          });
        });
      })
    );

    // stores a cookie inside browser
    passport.serializeUser((user, cb) => {
        // stores a cookie with user.id
        cb(null, user.id);
      });

    // unravels cookies and returns user from it
    passport.deserializeUser((id, cb) => {
        User.findOne({ _id: id }, (err, user) => {
            // this only sends user information
            // you can use this to control which info is sent
            const userInformation = {
                username: user.username,
            };
            cb(err, userInformation);
        });
    });

};