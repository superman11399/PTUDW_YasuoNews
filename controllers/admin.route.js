const express = require('express');
const userModel = require('../models/user.model');
const newsModel = require('../models/news.model');
const cateModel = require('../models/category.model');
const tagModel = require('../models/tag.model');

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/admin/manage/category');
});

router.get('/manage/category', async function (req, res) {
    res.render('adminView/category', {
        layout: 'admin.hbs',
        title: 'Admin | Quản lí chuyên mục',
    });
});

router.get('/manage/post', async function (req, res) {
    res.render('adminView/post', {
        layout: 'admin.hbs',
        title: 'Admin | Quản lí bài viết',
    });
});

router.get('/manage/tag', async function (req, res) {
    const list = await tagModel.allWithDetail();

    res.render('adminView/tag', {
        layout: 'admin.hbs',
        title: 'Admin | Quản lí nhãn tag',
        tagList: list,
    });
});

router.post('/manage/tag/delTag', async function (req, res) {
    if (typeof req.body.id !== 'undefined')
        await tagModel.delTag(req.body.id);
    res.redirect('/admin/manage/tag');
});

router.post('/manage/tag/rename', async function (req, res) {
    if (typeof req.body.id !== 'undefined')
        await tagModel.patch('idTag',req.body.id,'tag','TenTag',req.body.newTagName);
    res.redirect('/admin/manage/tag');
});

router.post('/manage/tag/add', async function (req, res) {
    if (typeof req.body.newTag !== 'undefined')
        tag = {
            TenTag: req.body.newTag
        }
        await tagModel.add(tag,'tag');
    res.redirect('/admin/manage/tag');
});

router.get('/manage/user', async function (req, res) {
    const list = await userModel.all();

    res.render('adminView/user-general', {
        layout: 'admin.hbs',
        title: 'Admin | Quản lí người dùng',
        userList: list,
    });
});

router.get('/manage/user/guest', async function (req, res) {
    const list = await userModel.findByUserType('guest');

    res.render('adminView/user-guest', {
        layout: 'admin.hbs',
        title: 'Admin | Quản lí người dùng độc giả vãng lai',
        userList: list,
    });
});

router.get('/manage/user/subscriber', async function (req, res) {
    const userlist = await userModel.findSubscriberWithDetail();

    res.render('adminView/user-subscriber', {
        layout: 'admin.hbs',
        title: 'Admin | Quản lí độc giả vip',
        userList: userlist,
    });
});

router.get('/manage/user/writer', async function (req, res) {
    const userlist = await userModel.findWriterWithDetail();

    res.render('adminView/user-writer', {
        layout: 'admin.hbs',
        title: 'Admin | Quản lí người dùng biên tập viên',
        userList: userlist,
    });

});

router.get('/manage/user/editor', async function (req, res) {
    const userlist = await userModel.findEditorWithDetail();
    const catelist = await cateModel.findNonAssignedCate();

    res.render('adminView/user-editor', {
        layout: 'admin.hbs',
        title: 'Admin | Quản lí người dùng biên tập viên',
        userList: userlist,
        cateList: catelist
    });
});

router.post('/manage/user/delUser', async function (req, res) {
    if (typeof req.body.id !== 'undefined')
        await userModel.delUser(+req.body.id, req.body.type);
    res.redirect('/admin/manage/user');
});

router.post('/manage/user/patchRole', async function (req, res) {
    if (typeof req.body.id !== 'undefined')
        await userModel.patchRole(req.body.id, req.body.role, req.body.oldrole);
            
    res.redirect('/admin/manage/user');
});

router.post('/manage/user/renewal', async function (req, res) {
    console.log(req.body.id);
    if (typeof req.body.id !== 'undefined')
        await userModel.renewSubs(req.body.id);
            
    res.redirect('/admin/manage/user/subscriber');
});

router.post('/manage/user/assignCate', async function (req, res) {
    row = {
        idBTV: req.body.ideditor,
        idChuyenMucChinh: req.body.idcate
    }

    userModel.assignCate(row);
    res.redirect('/admin/manage/user/editor');
});

router.get('/manage/user/profile/:id', async function (req, res) {
    const userId = +req.params.id || 0;
    result = await userModel.findUserWithDetail(userId);

    res.render('adminView/user-profile', {
        layout: 'admin.hbs',
        title: 'Admin | Thông tin người dùng',
        user: result,
    });
});

module.exports = router;