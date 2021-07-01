const express = require('express');
const userModel = require('../models/user.model')

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/admin/manage/category');
});

router.get('/manage/category', function (req, res) {
    res.render('adminView/category', {
        layout: 'admin.hbs',
        title: 'Admin | Quản lí chuyên mục',
    });
});

router.get('/manage/post', function (req, res) {
    res.render('adminView/post', {
        layout: 'admin.hbs',
        title: 'Admin | Quản lí bài viết',
    });
});

router.get('/manage/tag', function (req, res) {
    res.render('adminView/tag', {
        layout: 'admin.hbs',
        title: 'Admin | Quản lí nhãn tag',
    });
});

router.get('/manage/user', async function (req, res) {
    const list = await userModel.all();

    res.render('adminView/user', {
        layout: 'admin.hbs',
        title: 'Admin | Quản lí người dùng',
        userList: list,
    });
});

router.post('/manage/user', async function (req, res) {
    if(req.body.TypeUser === 'all')
        res.redirect('/admin/manage/user');
    const list = await userModel.findByUserType(req.body.TypeUser);

    res.render('adminView/user', {
        layout: 'admin.hbs',
        title: 'Admin | Quản lí người dùng',
        userList: list,
    });
});

router.post('/delUser', async function (req, res) {
    if (typeof req.body.id !== 'undefined')
        await userModel.del('idNguoiDung',+req.body.id, 'nguoidung');
    res.redirect('/admin/manage/user');
});

router.post('/patchRole', async function (req, res) {
    console.log(req.body.role);
    console.log(req.body.oldrole);
    if (typeof req.body.id !== 'undefined')
        await userModel.patchRole(req.body.id, req.body.role);
            
    res.redirect('/admin/manage/user');
});

module.exports = router;