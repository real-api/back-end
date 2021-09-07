const Strategy = require("passport-local").Strategy;
const UserModel = require("app/models/user.model");
const bcrypt = require("bcrypt")
const passport = require("passport");
const UserRole = require("app/http/controllers/api/auth/user.role")
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    UserModel.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use("local.login", new Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, (req, email, password, done) => {
    UserModel.findOne({ email }, (err, user) => {
        console.log(err);
        if (err) {
            return done('NotFound Account', null);
        }
        if (user) {

            if (bcrypt.compareSync(password, user.password)) {
                return done(null, user);
            } else {
                return done("E-mail or password is not correct", null);
            }
        } else {
            return done("NotFound Account", null);
        }
    });
}))

passport.use("local.register", new Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async(req, email, password, done) => {
    UserModel.findOne({
        email
    }, async(err, user) => {
        if (err) {
            done("Register Failed", null);
        }
        if (user) {
            done("E-mail exist please try with another", null);
        } else {
            if (password === req.body.confirmpassword) {
                let salt = bcrypt.genSaltSync(15);
                let hash = bcrypt.hashSync(password, salt);
                UserModel.create({
                    name: req.body.name,
                    email,
                    password: hash,
                    role : UserRole.USER
                }, (err, user) => {
                    if (err) {
                        done("Register Done", null);
                    }
                    if (user) {
                        done(null, user)
                    } else {
                        done("Register Failed", null);
                    }
                });
            } else {
                done("Password Not match with confirm-password", null);
            }
        }

    })
}));