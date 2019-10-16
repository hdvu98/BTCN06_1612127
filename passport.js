const passport    = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;
const UserModel = require('./models/user.model');

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, cb) {
        //Assume there is a DB module pproviding a global UserModel
        return UserModel.findOne({username: username, password: password})
            .then(user => {
                if (!user) {
                    return cb(null, false, {message: 'Incorrect username or password.'});
                }

                return cb(null, user, {
                    message: 'Logged In Successfully'
                });
            })
            .catch(err => {
                return cb(err);
            });
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {
        //find the user in db if needed
        return UserModel.findOne({username:jwtPayload.username})
            .then(user => {
                var obj = {
                    username: user.username,
                    student_id: user.student_id,
                    full_name: user.full_name,
                    class_id: user.class_id,
                }
                return cb(null, {user:obj});
            })
            .catch(err => {
                return cb(err);
            });
    }
));