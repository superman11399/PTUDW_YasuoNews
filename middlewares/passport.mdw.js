const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
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
                // Đăng nhập thành công
                return done(null, rows[0],req.flash('login_message','Đăng nhập thành công'));
            }
    ));
    passport.use('facebook-login', new FacebookStrategy({
        clientID: '788821835170949',
        clientSecret: 'ea575cf3f441cb71a6a96e47ba70abfb',
        callbackURL: "/account/facebook-login/callback",
        profileFields: ['id','displayName']
      },
      async function(accessToken, refreshToken, profile, done) {
            console.log(profile);
            const rows = await authen.findByFacebookID(profile.id);
            if (!rows || rows.length === 0)
            {
                const hash = bcrypt.hashSync(profile.id, 10);
                const newUser = {
                    TenDangNhap: profile.id,
                    HoTen: 'fbUser'+profile.displayName,
                    Email: profile.id,
                    LoaiNguoiDung: 'guest',
                    MatKhau: hash,
                    TinhTrang: 1
                };
                await authen.addNewFacebookUser(newUser);
                const userFacebook = await authen.findByUsername(profile.id);
                const newFacebookUserEntry = {
                    idNguoiDung: userFacebook[0].idNguoiDung,
                    FacebookID: profile.id
                }
                await authen.addNewFacebookEntry(newFacebookUserEntry);
                const newrows = await authen.findByFacebookID(profile.id);
                delete newrows[0].MatKhau;
                const user = newrows[0];
                // Đăng ký mới và đăng nhập thành công
                return done(null, user);
            }
            else
            {
                delete rows[0].MatKhau;
                const user = rows[0];
                return done(null, user);
            }
        }
    ));
    app.use(passport.initialize());
    app.use(passport.session());
};