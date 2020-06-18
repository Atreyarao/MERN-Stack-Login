const secret = "atreya";
const jwtStratery = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("usersDB");

//console.log(extractJwt.fromAuthHeaderWithScheme.toString());
//options to put in stratergy(jwt)
const options = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
};

const stratergy = new jwtStratery(options, (payload, done) => {
    User.findById(payload.id)
        .then((user) => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        })
        .catch((err) => {
            console.log(err);
        });
});

function verfyToken(passport) {
    passport.use(stratergy);
}

module.exports = verfyToken;