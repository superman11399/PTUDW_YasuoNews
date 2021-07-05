const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcryptjs");

const authen = require("../models/authen.model");

module.exports = function (app) {
    passport.serializeUser(function(user, done) {
        //In serialize user you decide what to store in the session. Here I'm storing the user id only.
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) { //Here you retrieve all the info of the user from the session storage using the user id stored in the session earlier using serialize user.
        authen.findById(id, function(err, rows) {
        done(err, rows[0]);
        });
    });

    passport.use(
        'local-login',
        new LocalStrategy({
            // Khai báo biến dùng để authen người dùng
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // cho phép truyền lại Req cho Callback
        },
        async function(req, username, password, done) { // callback
                const rows = await authen.findByUsername(username);
                if (!rows)
                {
                    return done(null,false, req.flash('err_message', 'Lỗi kết nối Database.'));
                }
                else if (!rows.length) {
                    return done(null, false, req.flash('err_message', 'Không tồn tại tên đăng nhập.')); // req.flash is the way to set flashdata using connect-flash
                }
                else
                {
                    const checkPass = await bcrypt.compareSync(password, rows[0].MatKhau);
                    if (!checkPass)
                    {
                        return done(null, false, req.flash('err_message', 'Sai mật khẩu.')); // create the err_message and save it to session as flashdata
                    }
                }
                delete rows[0].MatKhau;
                req.session.auth=true;
                req.session.authUser = rows[0];
                // Authen successfully
                return done(null, rows[0],req.flash('login_message','Đăng nhập thành công'));
            }
    ));

    app.use(passport.initialize());
    app.use(passport.session());
};