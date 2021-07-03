const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');

const userModel = require('../models/user.model');
const auth = require('../middlewares/auth.mdw');

const router = express.Router();

router.get('/profile', function (req, res) {
  res.render('accountView/profile',{
    layout: 'account.hbs'
  });
});

router.get('/register', function (req, res) {
  res.render('accountView/register', {
    layout: 'account.hbs'
  });
})

router.post('/register', async function (req, res) {
  console.log(req.body);
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

  await userModel.addNewGuest(user);
  res.render('accountView/login', {
    layout: 'account.hbs',
    message: 'Đã đăng ký thành công! Vui lòng đăng nhập.'
  });
})

router.get('/is-available', async function (req, res) {
  const username = req.query.user;
  const user = await userModel.findByUsername(username);
  if (user === null) {
    return res.json(true);
  }
  res.json(false);
})

router.get('/login', async function (req, res) {
  res.render('accountView/login', {
    layout: 'account.hbs'
  });
});

router.post('/login', async function (req, res) {
  const user = await userModel.findByUsername(req.body.username);
  if (user === null) {
    return res.render('vwAccount/login', {
      layout: false,
      err_message: 'Invalid username!'
    })
  }

  const ret = bcrypt.compareSync(req.body.password, user.password);
  if (ret === false) {
    return res.render('vwAccount/login', {
      layout: false,
      err_message: 'Invalid password!'
    })
  }

  delete user.password;
  req.session.auth = true;
  req.session.authUser = user;

  const url = req.session.retUrl || '/';
  res.redirect(url);
})

router.post('/logout', async function (req, res) {
  req.session.auth = false;
  req.session.authUser = null;
  req.session.retUrl = '';

  const url = req.headers.referer || '/';
  res.redirect(url);
})

module.exports = router;