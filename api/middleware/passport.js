const User = require("../models/User");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SecretOrKey || process.env.JWT_SECRET || "secret",
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ _id: jwt_payload.id || jwt_payload._id }).select("-password");
      return user ? done(null, user) : done(null, false);
    } catch (error) {
      console.log(error);
      return done(error, false);
    }
  })
);

const isAuth = () => passport.authenticate("jwt", { session: false });

module.exports = { isAuth };