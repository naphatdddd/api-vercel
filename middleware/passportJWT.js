const User = require("../models/user");
const config = require("../config/index");
const passport = require("passport");

var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWT_SECRET;
// opts.issuer = "accounts.examplesoft.com";
// opts.audience = "yoursite.net";
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, async function (err, user) {
      try {
        const user = await User.findById(jwt_payload.id);
        if (!user) {
          return done(new Error("ไม่พบผู้ใช้งานในระบบ"), null);
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    });
  })
);

module.exports.isLogin = passport.authenticate("jwt", { session: false });
