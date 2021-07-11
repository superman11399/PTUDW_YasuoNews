const express = require("express");
const userModel = require("../models/user.model");
const newsModel = require("../models/news.model");
const cateModel = require("../models/category.model");
const tagModel = require("../models/tag.model");
const bcrypt = require('bcryptjs');

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/admin/manage/category");
});

router.get("/manage/category", async function (req, res) {
  const mainCateList = await cateModel.findCategoryWithDetail();
  const subCateList = await cateModel.findSubCategoryWithDetail();

  res.render("adminView/category", {
    layout: "admin.hbs",
    title: "Admin | Quản lí chuyên mục",
    listCategory: mainCateList,
    listSubCategory: subCateList,
  });
});

router.get("/manage/post", async function (req, res) {
  const articles = await newsModel.all();
  const categories = await cateModel.allMainCate();
  const subCategories = await cateModel.all();
  const tags = await tagModel.all();
  const tagsOfArticle = await newsModel.getAllTagWithDetail();

  res.render("adminView/post", {
    layout: "admin.hbs",
    title: "Admin | Quản lí bài viết",
    listArticle: articles,
    listCate: categories,
    listSubCate: subCategories,
    listTagOfArticle: tagsOfArticle,
    listTag: tags
  });
});

router.get("/manage/post/:id", async function (req, res) {
  const id = +req.params.id;
  const details = await newsModel.getDetailOfPostForAdmin(id);
  const comment = await newsModel.getCommentOfArticle(id);
  const subCateList = await cateModel.allSubCate();
  const tags = await tagModel.all();
  const tagsOfArticle = await newsModel.getAllTagWithDetail();

  res.render("adminView/post-detail", {
    layout: "admin.hbs",
    title: "Admin | Quản lí bài viết",
    article: details,
    comments: comment,
    listSubCate: subCateList,
    listTagOfArticle: tagsOfArticle,
    listTag: tags
  });
});

router.post("/manage/post/del", async function (req, res) {
  const id = req.body.id; 
  if (typeof(id) !== "undefined") 
    await newsModel.del(id);
  res.redirect("/admin/manage/post/");
});

router.post("/manage/post/delCom", async function (req, res) {
  const id = req.body.id; 
  const url = req.headers.referer || '/admin/manage/post/';
  if (typeof(id) !== "undefined") 
    await newsModel.delCom(id);
  res.redirect(url);
});

router.post("/manage/post/update", async function (req, res) {
  const id = req.body.postID;
  const subID = req.body.subID;
  const status = req.body.newStatus;
  const url = req.headers.referer || '/admin/manage/post/';
  if (typeof(id) !== "undefined") 
    await newsModel.updatePost(id,subID,status);
  res.redirect(url);
});

router.get("/manage/tag", async function (req, res) {
  const list = await tagModel.allWithDetail();

  res.render("adminView/tag", {
    layout: "admin.hbs",
    title: "Admin | Quản lí nhãn tag",
    tagList: list,
  });
});

router.post("/manage/tag/delTag", async function (req, res) {
  if (typeof(req.body.id) !== "undefined") await tagModel.delTag(req.body.id);
  res.redirect("/admin/manage/tag");
});

router.post("/manage/tag/rename", async function (req, res) {
  if (typeof(req.body.id) !== "undefined")
    await tagModel.patch(
      "idTag",
      req.body.id,
      "tag",
      "TenTag",
      req.body.newTagName
    );
  res.redirect("/admin/manage/tag");
});

router.post("/manage/tag/add", async function (req, res) {
  if (typeof(req.body.newTag) !== "undefined")
    tag = {
      TenTag: req.body.newTag,
    };
  await tagModel.add(tag, "tag");
  res.redirect("/admin/manage/tag");
});

router.get("/manage/user", async function (req, res) {
  const list = await userModel.all();

  res.render("adminView/user-general", {
    layout: "admin.hbs",
    title: "Admin | Quản lí người dùng",
    userList: list,
  });
});

router.get("/manage/user/add", async function (req, res) {
  const catelist = await cateModel.findNonAssignedCate();

  res.render("adminView/user-add", {
    layout: "admin.hbs",
    title: "Admin | Thêm người dùng",
    cateList: catelist
  });
});

router.post("/manage/user/add", async function (req, res) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const dob = req.body.dob + ' 00:00:00';
  const cateID = req.body.idcate;
  const user = {
    HoTen: req.body.fullname,
    NgaySinh: dob,
    GioiTinh: req.body.gender,
    Email: req.body.email,
    TenDangNhap: req.body.username,
    MatKhau: hash,
    LoaiNguoiDung: req.body.role,
    avatar: '/img/default-avatar.png',
    TinhTrang: 1
  }

  const url = req.session.retUrl || '/admin/manage/user';
  await userModel.addUserWithDetail(user, cateID);
  res.redirect(url);
});

router.get("/manage/user/guest", async function (req, res) {
  const list = await userModel.findByUserType("guest");

  res.render("adminView/user-guest", {
    layout: "admin.hbs",
    title: "Admin | Quản lí người dùng độc giả vãng lai",
    userList: list,
  });
});

router.get("/manage/user/subscriber", async function (req, res) {
  const userlist = await userModel.findSubscriberWithDetail();

  res.render("adminView/user-subscriber", {
    layout: "admin.hbs",
    title: "Admin | Quản lí độc giả vip",
    userList: userlist,
  });
});

router.get("/manage/user/writer", async function (req, res) {
  const userlist = await userModel.findWriterWithDetail();

  res.render("adminView/user-writer", {
    layout: "admin.hbs",
    title: "Admin | Quản lí người dùng biên tập viên",
    userList: userlist,
  });
});

router.get("/manage/user/editor", async function (req, res) {
  const userlist = await userModel.findEditorWithDetail();
  const catelist = await cateModel.findNonAssignedCate();

  res.render("adminView/user-editor", {
    layout: "admin.hbs",
    title: "Admin | Quản lí người dùng biên tập viên",
    userList: userlist,
    cateList: catelist,
  });
});

router.post("/manage/category/delMain", async function (req, res) {
  if (typeof(req.body.id) !== "undefined")
    await cateModel.delMainCate(+req.body.id);
  res.redirect("/admin/manage/category");
});

router.post("/manage/category/delSub", async function (req, res) {
  if (typeof(req.body.id) !== "undefined")
    await cateModel.delSubCate(+req.body.id);
  res.redirect("/admin/manage/category");
});

router.post("/manage/category/renameMain", async function (req, res) {
  if (typeof(req.body.id) !== "undefined") {
    const row = {
      id: req.body.id,
      TenChuyenMuc: req.body.name,
    };
    await cateModel.patchRow(row, "idChuyenMucChinh", "chuyenmucchinh");
  }
  res.redirect("/admin/manage/category");
});

router.post("/manage/category/patchSub", async function (req, res) {
  if (typeof(req.body.id) !== "undefined") {
    const row = {
      id: req.body.id,
      TenChuyenMucPhu: req.body.name,
      idChuyenMucChinh: req.body.parentID,
    };
    await cateModel.patchRow(row, "idChuyenMucPhu", "chuyenmucphu");
  }
  res.redirect("/admin/manage/category");
});

router.post("/manage/category/addMain", async function (req, res) {
  const row = {
    TenChuyenMuc: req.body.name,
  };
  await cateModel.add(row, "chuyenmucchinh");
  res.redirect("/admin/manage/category");
});

router.post("/manage/category/addSub", async function (req, res) {
  const row = {
    TenChuyenMucPhu: req.body.name,
    idChuyenMucChinh: +req.body.newSubCate_parent,
  };
  await cateModel.add(row, "chuyenmucphu");
  res.redirect("/admin/manage/category");
});

router.post("/manage/user/delUser", async function (req, res) {
  if (typeof(req.body.id) !== "undefined")
    await userModel.delUser(+req.body.id, req.body.type);
  res.redirect("/admin/manage/user");
});

router.post("/manage/user/patchRole", async function (req, res) {
  if (typeof(req.body.id) !== "undefined")
    await userModel.patchRole(req.body.id, req.body.role, req.body.oldrole);

  res.redirect("/admin/manage/user");
});

router.post("/manage/user/renewal", async function (req, res) {
  if (typeof(req.body.id) !== "undefined")
    await userModel.renewSubs(req.body.id);

  res.redirect("/admin/manage/user/subscriber");
});

router.post("/manage/user/assignCate", async function (req, res) {
  row = {
    idBTV: req.body.ideditor,
    idChuyenMucChinh: req.body.idcate,
  };

  userModel.assignCate(row);
  res.redirect("/admin/manage/user/editor");
});

router.get("/manage/user/profile/:id", async function (req, res) {
  const userId = +req.params.id || 0;
  result = await userModel.findUserWithDetail(userId);
  const url = req.headers.referer || '/';

  res.render("adminView/user-profile", {
    layout: "admin.hbs",
    title: "Admin | Thông tin người dùng",
    user: result,
    backurl: url
  });
});

module.exports = router;
