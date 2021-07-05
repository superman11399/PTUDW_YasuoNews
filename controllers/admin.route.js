const express = require("express");
const userModel = require("../models/user.model");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/admin/manage/category");
});

router.get("/manage/category", function (req, res) {
  res.render("adminView/category", {
    layout: "admin.hbs",
    title: "Admin | Quản lí chuyên mục",
  });
});

router.get("/manage/post", function (req, res) {
  res.render("adminView/post", {
    layout: "admin.hbs",
    title: "Admin | Quản lí bài viết",
  });
});

router.get("/manage/tag", function (req, res) {
  res.render("adminView/tag", {
    layout: "admin.hbs",
    title: "Admin | Quản lí nhãn tag",
  });
});

router.get("/manage/user", async function (req, res) {
  const list = await userModel.all();
  res.render("adminView/user", {
    layout: "admin.hbs",
    title: "Admin | Quản lí người dùng",
    userList: list,
  });
});

router.get("/manage/user", function (req, res) {
  res.render("adminView/user", {
    layout: "admin.hbs",
    title: "Admin | Quản lí người dùng",
  });
});

module.exports = router;
