const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("./models/user");

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findByName(username, (err, result) => {
      if (err) {
        done(err);
      }
      //Not found
      if (result.length === 0) {
        return done(null, false, { message: "Incorrect username" });
      } else {
        const user = result[0];
        //Compare passwords using bcryptjs.
        bcrypt.compare(password, user.password, (err, res) => {
          if (err) {
            return done(err);
          }
          if (res) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Incorrect password" });
          }
        });
      }
    });
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret-key",
    },
    function (jwtPayload, done) {
      return done(null, jwtPayload);
    }
  )
);

module.exports = passport;
