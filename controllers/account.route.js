const express = require('express');
const bcrypt = require('bcryptjs');
const authen = require('../models/authen.model');
const auth = require('../middlewares/auth.mdw');
const passport = require('passport');
const router = express.Router();


router.get('/register', function (req, res) {
  res.render('accountView/register', {
    layout: 'account.hbs'
  });
})

router.post('/register', async function (req, res) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const dob = req.body.dob + ' 00:00:00';
  console.log(dob);
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

  await authen.addGuest(user);
  req.flash('succ_message','Đã đăng ký thành công! Vui lòng đăng nhập.');
  res.redirect('account/login');
})

router.get('/is-available', async function (req, res) {
  const username = req.query.user;
  const user = await userModel.findByUsername(username);
  if (user === null) {
    return res.json(true);
  }
  res.json(false);
})

router.get('/login', isAuth, async function (req, res) {
  const err_message = req.flash('err_message');
  const succ_message = req.flash('succ_message');
  console.log(err_message);
  console.log(succ_message);
  res.render('accountView/login', {
    layout: 'account.hbs',
    err_message: err_message,
    succ_message: succ_message
  });
});

// process the login form
router.post('/login', passport.authenticate('local-login', {
  session :false,
  failureRedirect : '/account/login', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}), (req, res) => {
  if (req.body.remember) {
    req.session.cookie.maxAge = 1000 * 60 * 3;
  } else {
    req.session.cookie.expires = false;
  }
  console.log(req);
  res.redirect('/news/home');
});

router.post('/logout', async function (req, res) {
  req.session.auth = false;
  req.session.authUser = null;
  req.session.retUrl = '';

  const url = req.headers.referer || '/';
  res.redirect(url);
})

router.get('/profile', function (req, res) {
  res.render('accountView/profile',{
    layout: 'account.hbs'
  });
});


module.exports = router;

function isAuth(req, res, next) {
  if (!res.locals.auth) {
      next();
  } else {
      res.redirect('/news/home');
  }
}
function isNotAuth(req, res, next) {
  if (res.locals.auth) {
      next();
  } else {
      res.redirect('/');
  }
}