import passportJwt from 'passport-jwt';
import Users from '../models/user.js';
import { SECRET_OR_KEY } from '../config/config.js';

const { ExtractJwt } = passportJwt;
const { Strategy } = passportJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_OR_KEY;

export default (passport) => {
    passport.use('jwt', new Strategy(opts, (jwt_payload, done) => {
        Users.findById(jwt_payload.id)
            .then(user => {
                if(user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.log(err));
    }));
}