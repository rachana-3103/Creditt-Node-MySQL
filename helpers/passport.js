const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const db = require('./db');
require('dotenv').config();

module.exports = function (passport) {
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRECTKEY
    },
        async (jwtPayload, cb) => {
            const user = await db.User.findOne({
                where: {
                    email: jwtPayload.email,
                }
            });
            if (user) {
                return cb(null, user);
            } else {
                return cb(err, false);
            }
        }
    ));
}
