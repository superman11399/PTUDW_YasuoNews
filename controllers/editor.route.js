const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/editor/list");
});

router.get("/list", function (req, res) {
  res.render("editorView/editorList", {
    layout: "editor.hbs",
    title: "Editor",
    topic: "Danh sách bài viết",
  });
});

router.get("/view", function (req, res) {
  res.render("editorView/detail", {
    layout: "editor.hbs",
    title: "Editor",
    topic: "Chi tiết bài viết",
  });
});

module.exports = router;
