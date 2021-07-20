const express = require("express");
const multer = require("multer");
const router = express.Router();
const date = require("date-and-time");
const news = require("../models/news.model");
const fs = require("fs-extra");

router.get("/", (req, res) => {
  res.redirect("/writer/post");
});

router.get("/post", async function (req, res) {
  const tags = await news.LayDanhSachTag();
  const listSub = await news.LayDanhSachChuyenMucPhu();
  // console.log(listSub);
  // console.log(tags);
  res.render("writerView/post", {
    layout: "writer.hbs",
    title: "Writer",
    topic: "Thêm bài viết",
    tags: tags,
    listSub: listSub,
  });
});

router.post("/post", function (req, res) {
  let AnhDaiDien = "";
  const idTacGia = req.session.authUser.idNguoiDung;
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./public/img/BaiBao");
    },
    filename(req, file, cb) {
      console.log("log2", file);
      AnhDaiDien = file.originalname;
      cb(null, file.originalname);
    },
  });
  const upload = multer({
    storage,
  });
  upload.single("file")(req, res, async function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(req.body);
      const now = new Date();
      const NgayCuoiChinhSua = date.format(now, "YYYY-MM-DD HH:mm:ss");
      const tagList = req.body.arrayOfTags;
      delete req.body.arrayOfTags;
      let baibao = req.body;
      baibao = Object.assign(
        {
          idTacGia,
          AnhDaiDien,
          NgayCuoiChinhSua,
        },
        baibao
      );
      // baibao.append(idTacGia);
      console.log("baibao", baibao);
      const result = await news.ThemBaiViet(baibao);
      console.log("idbaibao", result);

      var oldPath = "public\\img\\BaiBao\\" + AnhDaiDien;
      var newPath = "public\\img\\BaiBao\\" + result + "\\" + AnhDaiDien;
      console.log("path", oldPath, newPath);

      fs.move(oldPath, newPath, function (err) {
        if (err) return console.error(err);
        console.log("success move file!");
      });

      // console.log(result[0]);
      if (result === null) {
        req.flash("errorDelete", "Thêm bài viết thất bại");
        res.redirect("/writer/waiting");
      }
      for (let index = 0; index < tagList.length; ++index) {
        const result2 = await news.ThemTagBaiViet(result[0], tagList[index]);
        // console.log("res2", result2);
      }
      req.flash("successPost", "Thêm bài viết thành công");
      res.redirect("/writer/waiting");
    }
  });
});

router.get("/post/:id", async function (req, res) {
  const idTacGia = req.session.authUser.idNguoiDung;
  const idBaiBao = req.params.id;
  const tags = await news.LayDanhSachTag();
  const listSub = await news.LayDanhSachChuyenMucPhu();
  const article = await news.ChiTietBaiVietVer2(idBaiBao);
  let tagsOfNews = await news.LayDanhSachTagCuaBaiViet(idBaiBao);
  console.log("tagsofnews", tagsOfNews[0]);
  let list = [];

  if (tagsOfNews[0].length !== 0) {
    console.log("list", tagsOfNews[0][0].idTag);
    for (let i = 0; i < tagsOfNews[0].length; i++) {
      list.push(tagsOfNews[0][i].idTag);
    }
  }

  console.log(list);
  console.log("article", article);
  if (article === null) {
    console.log("ID k ton tai?");
    req.flash("errorDelete", "ID k tồn tại hoặc Bạn k có quyền để xem");
    res.redirect("/writer/waiting");
  } else if (article.idTacGia !== idTacGia) {
    req.flash("errorDelete", "Ban k phai la tac gia, k the chinh sua");
    res.redirect("/writer/waiting");
  }
  // console.log(tags);
  else {
    let deny = false;
    let edit = false;
    console.log("khac: ", !article.LyDoTuChoi);
    if (article.LyDoTuChoi !== "" && article.LyDoTuChoi !== null) deny = true;
    if (
      article.TinhTrangDuyet === "Chưa được duyệt" ||
      article.TinhTrangDuyet === "Bị từ chối"
    )
      edit = true;
    const topic = edit ? "Chỉnh sửa bài viết" : "Xem bài viết";
    res.render("writerView/post", {
      actionpost: "/writer/post",
      action: "/writer/edit",
      layout: "writer.hbs",
      title: "Writer",
      topic,
      article,
      tags: tags,
      listSub: listSub,
      tagsOfNews: list,
      deny,
      edit,
    });
  }
});

router.post("/edit", async function (req, res) {
  let AnhDaiDien = "";
  const idTacGia = req.session.authUser.idNguoiDung;
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./public/img/BaiBao");
    },
    filename(req, file, cb) {
      console.log("log2", file);
      AnhDaiDien = file.originalname;
      cb(null, file.originalname);
    },
  });
  const upload = multer({
    storage,
  });
  upload.single("file")(req, res, async function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(req.body);
      const oldAvatar = req.body.oldAvatar;
      delete req.body.oldAvatar;
      const now = new Date();
      const NgayCuoiChinhSua = date.format(now, "YYYY-MM-DD HH:mm:ss");
      const tagList = req.body.arrayOfTags;
      delete req.body.arrayOfTags;
      const id = req.body.idBaiBao;
      let baibao = req.body;
      if (AnhDaiDien === "") {
        AnhDaiDien = oldAvatar;
      } else {
        var oldPath = "public\\img\\BaiBao\\" + AnhDaiDien;
        var newPath = "public\\img\\BaiBao\\" + id + "\\" + AnhDaiDien;
        console.log("path", oldPath, newPath);

        fs.move(oldPath, newPath, function (err) {
          if (err) return console.error(err);
          console.log("success move file!");
        });
      }
      baibao = Object.assign(
        {
          // idTacGia: idTacGia,
          AnhDaiDien,
          NgayCuoiChinhSua,
          TinhTrangDuyet: "Chưa được duyệt",
          LyDoTuChoi: "",
        },
        baibao
      );
      console.log("baibao", baibao);

      const result = await news.UpdateBaiViet(id, baibao);
      const delres = await news.XoaTagBaiViet(id);
      if (delres === null) {
        console.log("K the xoa TAG bai viet!");
      }
      console.log("delres", delres);
      // console.log(result);
      console.log("res0", result);
      if (result === null) {
        console.log("K the update bai");
        req.flash("errorDelete", "Chỉnh sửa bài viết thất bại");
        res.redirect("/writer/waiting");
      }

      for (let index = 0; index < tagList.length; ++index) {
        const result2 = await news.ThemTagBaiViet(id, tagList[index]);
        console.log("res2", result2);
      }
      req.flash("successPost", "Chỉnh sửa bài viết thành công");
      res.redirect("/writer/waiting");
    }
  });
});

router.get("/waiting", async function (req, res) {
  const errors = req.flash("errorDelete");
  const success = req.flash("successPost");
  const idTacGia = req.session.authUser.idNguoiDung;
  const listNews = await news.LayDanhSachBaiVietTheoTinhTrangVaTacGia(
    "Chưa được duyệt",
    idTacGia
  );
  // console.log(listNews[0]);
  res.render("writerView/writerList", {
    layout: "writer.hbs",
    title: "Writer",
    topic: "Danh sách bài viết chưa được duyệt",
    listNews: listNews[0],
    errors: errors,
    hasError: errors.length > 0,
    success: success,
    hasSuccess: success.length > 0,
  });
});

router.get("/published", async function (req, res) {
  const idTacGia = req.session.authUser.idNguoiDung;
  const listNews = await news.LayDanhSachBaiVietTheoTinhTrangVaTacGia(
    "Đã xuất bản",
    idTacGia
  );
  // console.log(listNews[0]);
  res.render("writerView/writerList", {
    layout: "writer.hbs",
    title: "Writer",
    topic: "Danh sách bài viết đã xuất bản",
    listNews: listNews[0],
    notEdit: true,
  });
});
router.get("/rejected", async function (req, res) {
  const idTacGia = req.session.authUser.idNguoiDung;
  const listNews = await news.LayDanhSachBaiVietTheoTinhTrangVaTacGia(
    "Bị từ chối",
    idTacGia
  );
  // console.log(listNews[0]);
  res.render("writerView/writerList", {
    layout: "writer.hbs",
    title: "Writer",
    topic: "Danh sách bài viết bị từ chối",
    listNews: listNews[0],
  });
});
router.get("/approved", async function (req, res) {
  const idTacGia = req.session.authUser.idNguoiDung;
  const listNews = await news.LayDanhSachBaiVietTheoTinhTrangVaTacGia(
    "Đã duyệt - Chờ xuất bản",
    idTacGia
  );
  // console.log(listNews[0]);
  res.render("writerView/writerList", {
    layout: "writer.hbs",
    title: "Writer",
    topic: "Danh sách bài viết đã duyệt và chờ xuất bản",
    listNews: listNews[0],
    notEdit: true,
  });
});
router.delete("/delete-article/:id", (req, res, next) => {
  console.log("!!idparam", req.params.id);
  news
    .XoaBinhLuanBaiViet(req.params.id)
    .then((result) => {
      console.log("suc", result);
    })
    .catch((err) => {
      console.log("err", err);
    });
  news
    .XoaBaiBaoDuocDuyet(req.params.id)
    .then((result) => {
      console.log("suc", result);
    })
    .catch((err) => {
      console.log("err", err);
    });
  news
    .XoaTagBaiViet(req.params.id)
    .then((result) => {
      console.log("suc", result);
    })
    .catch((err) => {
      console.log("err", err);
    });
  news
    .XoaBaiViet(req.params.id)
    .then((result) => {
      req.flash("successPost", "Xóa bài viết thành công");
      console.log(result);
      res.status(200).json({ message: "successful" });
    })
    .catch((err) => {
      req.flash("errorDelete", "Xóa bài viết thất bại, thử lại sau.");
      console.log(err);
      res.status(500).json({ message: "Something wrong!" });
    });
});
module.exports = router;
