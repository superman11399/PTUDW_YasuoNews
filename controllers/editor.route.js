const express = require("express");
const date = require("date-and-time");
const news = require("../models/news.model");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/editor/waiting");
});

router.get("/waiting", async function (req, res) {
  const errors = req.flash("errors");
  const success = req.flash("success");
  console.log("er", errors);
  console.log("suc", success);
  const idBTV = 1;
  const listNews = await news.LayDanhSachBaiVietTheoTinhTrangVaBTV(
    "Chưa được duyệt",
    idBTV
  );
  res.render("editorView/editorList", {
    layout: "editor.hbs",
    title: "Danh sách bài viết chờ duyệt",
    listNews: listNews[0],
    errors: errors,
    hasError: errors.length > 0,
    success: success,
    hasSuccess: success.length > 0,
  });
});
router.get("/approved", async function (req, res) {
  const errors = req.flash("errors");
  const success = req.flash("success");
  const idBTV = 1;
  const listNews = await news.LayDanhSachBaiVietTheoTinhTrangVaBTV(
    "Đã duyệt - Chờ xuất bản",
    idBTV
  );
  res.render("editorView/editorList", {
    layout: "editor.hbs",
    title: "Danh sách bài viết đã duyệt",
    listNews: listNews[0],
    errors: errors,
    hasError: errors.length > 0,
    success: success,
    hasSuccess: success.length > 0,
  });
});
router.get("/rejected", async function (req, res) {
  const idBTV = 1;
  const listNews = await news.LayDanhSachBaiVietTheoTinhTrangVaBTV(
    "Bị từ chối",
    idBTV
  );
  res.render("editorView/editorList", {
    layout: "editor.hbs",
    title: "Danh sách bài viết bị từ chối",
    listNews: listNews[0],
  });
});
router.get("/view/:id", async function (req, res) {
  const idBTV = 1;
  const idBaiBao = req.params.id;
  const tags = await news.LayDanhSachTag();
  const listSub = await news.LayDanhSachChuyenMucPhu();
  // const article = await
  const article = await news.ChiTietBaiVietThuocBTV(idBaiBao, idBTV);

  console.log("reS", article[0][0]);
  if (!article[0][0]) {
    var err = new Error();
    console.log("ID k ton tai hoac Khong dc xem bai nay");

    req.flash("errors", "ID k ton tai hoac Khong dc xem bai nay");
    err.status = 404;
    err.message = "Không tìm thấy bài viết";
    res.redirect("/editor/waiting");
    return next(err);
  }
  const tagsOfNews = await news.LayDanhSachTagCuaBaiViet(idBaiBao);
  console.log("id", idBaiBao);
  console.log("tagsofnews", tagsOfNews[0]);
  let list = [];

  if (tagsOfNews[0].length !== 0) {
    console.log("first tag", tagsOfNews[0][0].idTag);
    for (let i = 0; i < tagsOfNews[0].length; i++) {
      list.push(tagsOfNews[0][i].idTag);
    }
  }
  const approve =
    article[0][0].TinhTrangDuyet === "Chưa được duyệt" ? true : false;
  const deny = article[0][0].TinhTrangDuyet === "Bị từ chối" ? true : false;
  console.log("LIST tag", list);
  console.log("article", article[0][0]);
  res.render("editorView/detail", {
    layout: "editor.hbs",
    title: "Editor",
    topic: "Chi tiết bài viết",
    article: article[0][0],
    tags: tags,
    listSub: listSub,
    tagsOfNews: list,
    approve,
    deny,
  });
  // .then((result) => {})
  // .catch((err) => {
  //   console.log("err", err);
  //   err.status = 500;
  //   next(err);
  // });

  // if (article === null) {
  //   console.log("ID k ton tai hoac Khong dc xem bai nay");
  //   res.redirect("/writer/waiting");
  // }
  // console.log(tags);
});
router.post("/approve/:id", async function (req, res) {
  const idBTV = 1;
  console.log("body", req.body);
  console.log("id", req.params.id);
  const id = req.params.id;
  const tagList = req.body.listTag;
  delete req.body.listTag;
  const NgayDang = req.body.NgayDang;
  delete req.body.NgayDang;
  let baibao = Object.assign(
    {
      TinhTrangDuyet: "Đã duyệt - Chờ xuất bản",
    },
    req.body
  );
  console.log("bb", baibao);

  const result = await news.UpdateBaiViet(id, baibao);
  const delres = await news.XoaTagBaiViet(id);
  if (delres === null) {
    console.log("K the xoa TAG bai viet!");
  }
  console.log("delres", delres);
  console.log("res0", result);
  if (result === null) {
    req.flash("errors", "Lỗi duyệt bài!");
    res.redirect("/editor/waiting");
  }
  const bb = { idBaiBao: id, NgayDang };
  const dang = await news.ThemBaiBaoDuocDuyet(bb);
  console.log("dang", dang);
  if (dang === null) {
    console.log("them baibaoduocduyet that bai!");
    req.flash("errors", "Lỗi thêm bài báo dc duyệt");
  }
  for (let index = 0; index < tagList.length; ++index) {
    const result2 = await news.ThemTagBaiViet(id, tagList[index]);
    console.log("res2", result2);
  }
  req.flash("success", "Duyệt bài viết thành công.");
  res.status(200).json({ message: "success" });
});
router.post("/deny/:id", async function (req, res) {
  const idBTV = 1;
  console.log("body", req.body);
  console.log("id", req.params.id);
  const id = req.params.id;
  let baibao = Object.assign(
    {
      TinhTrangDuyet: "Bị từ chối",
    },
    req.body
  );
  console.log("bb", baibao);

  const result = await news.UpdateBaiViet(id, baibao);
  console.log("res0", result);
  if (result === null) {
    req.flash("errors", "Lỗi từ chối bài!");
    res.redirect("/editor/waiting");
  }
  req.flash("success", "Từ chối bài viết thành công");
  res.status(200).json({ message: "success" });
});
module.exports = router;
