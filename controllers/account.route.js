const express = require('express');
const bcrypt = require('bcryptjs');
const authen = require('../models/authen.model');
const passport = require('passport');
const router = express.Router();
var nodemailer =  require('nodemailer');
function sendOTP(email) {
    var transporter =  nodemailer.createTransport({ // config mail server
        service: 'Gmail',
        auth: {
            user: 'tqtnk20003@gmail.com',
            pass: 'wBh7x5P3ETm72JgMqRWn'
        }
    });
    const randomOTP = Math.floor(100000 + Math.random() * 900000);
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'Yasuo News',
        to: email,
        subject: 'Xác nhận đăng ký tài khoản Yasuo News',
        html: '<b>Xin chào,</b><p>Bạn đã đăng ký thành công tài khoản tại Yasuo News. Mã OTP của bạn là: </p> <h1>'+randomOTP+'</h1><p>Vui lòng sử dụng mã OTP này để hoàn tất việc đăng ký tài khoản. OTP có hiệu lực trong 3 giờ.</p></br><p>Yasuo News</p>'
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            return null;
        } else {
            console.log('Message sent: ' +  info.response);
        }
    });
    return randomOTP;
};


router.get('/register', function (req, res) {
  res.render('accountView/register', {
    layout: 'account.hbs'
  });
})

router.post('/register', async function (req, res) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const dob = req.body.dob + ' 00:00:00';
  const user = {
    HoTen: req.body.fullname,
    NgaySinh: dob,
    GioiTinh: req.body.gender,
    Email: req.body.email,
    TenDangNhap: req.body.username,
    MatKhau: hash,
    LoaiNguoiDung: 'guest',
    TinhTrang: 1
  }
  const OTPcheck = await authen.checkOTP(req.body.OTP,req.body.email);
  if (OTPcheck)
    {
    await authen.addGuest(user);
    req.flash('succ_message','Đã đăng ký thành công! Vui lòng đăng nhập.');
    }
  else {
    req.flash('err_message','OTP bị lỗi hoặc đã quá hạn!');
  }
  res.redirect('login');
})

router.get('/send-OTP',async function (req,res){
  const email = req.query.email;
  const OTP = sendOTP(email);
  if (OTP === null) {
    return res.json(false);
  }
  await authen.saveOTP(OTP,email);
  res.json(true);
})

router.get('/is-available', async function (req, res) {
  const username = req.query.user;
  const user = await authen.checkUsername(username);
  if (user === null) {
    return res.json(true);
  }
  res.json(false);
})

router.get('/login', isNotAuth, async function (req, res) {
  const err_message = req.flash('err_message');
  const succ_message = req.flash('succ_message');
  res.render('accountView/login', {
    layout: 'account.hbs',
    err_message: err_message,
    succ_message: succ_message
  });
});

// process the login form
router.post('/login',isNotAuth, passport.authenticate('local-login', {
  session :false,
  failureRedirect : '/account/login', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}), (req, res) => {
  if (req.body.remember) {
    req.session.cookie.maxAge = 1000 * 60 * 3;
  } else {
    req.session.cookie.expires = false;
  }
  res.redirect('/news/home');
});

router.post('/logout',isAuth, async function (req, res) {
  req.session.auth = false;
  req.session.authUser = null;
  req.session.retUrl = '';

  const url = req.headers.referer || '/';
  res.redirect(url);
})

router.get('/profile',isAuth, function (req, res) {
  res.render('accountView/profile');
});


module.exports = router;

function isAuth(req, res, next) {
  if (res.locals.auth) {
      next();
  } else {
      res.redirect('/news/home');
  }
}
function isNotAuth(req, res, next) {
  if (!res.locals.auth) {
      next();
  } else {
      res.redirect('/news/home');
  }
}