const { getUserById } = require("../users/users.controllers");
const { jwt_secret } = require("../config");

const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = passport => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
        secretOrKey: jwt_secret,
    };
    passport.use(
        new JwtStrategy(opts, async (decoded, done) => {
            try {
                const response = await getUserById(decoded.id);
                if (!response) return done(null, false);
                console.log("decoded jwt", decoded);
                return done(null, decoded);
            } catch (error) {
                done(error.message);
            }
        })
    );
};
