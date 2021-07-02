const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/writer/post");
});

router.get("/post", function (req, res) {
  res.render("writerView/post", {
    layout: "writer.hbs",
    title: "Writer",
    topic: "Thêm bài viết",
  });
});

router.get("/post/:id", function (req, res) {
  res.render("writerView/post", {
    layout: "writer.hbs",
    title: "Writer",
    topic: "Chỉnh sửa bài viết",
  });
});

router.get("/posts", function (req, res) {
  res.render("writerView/writerList", {
    layout: "writer.hbs",
    title: "Writer",
    topic: "Danh sách bài viết",
  });
});

module.exports = router;
