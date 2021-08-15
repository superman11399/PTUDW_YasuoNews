const express = require("express");
const news = require("../models/news.model");
const users = require("../models/user.model");
const date = require("date-and-time");
const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/news/home");
});

router.get("/home", async function (req, res) {
  const listNoiBat = await news.BaiVietNoiBat();
  const listMoiNhat = await news.Top10MoiNhat();
  const listXemNhieu = await news.Top10XemNhieuNhat();
  const listChuyenMuc = await news.Top10ChuyenMuc();
  const listCMC = await news.LayDanhSachChuyenMucChinh();
  const listCMP = await news.LayDanhSachChuyenMucPhu();
  req.session.listCMC = listCMC;
  req.session.listCMP = listCMP;
  if (!res.locals.listCMC) {
    res.locals.listCMC = listCMC;
  }
  if (!res.locals.listCMP) {
    res.locals.listCMP = listCMP;
  }
  res.render("home", {
    BaiVietNoiBat: listNoiBat,
    Top10MoiNhat: listMoiNhat,
    Top10XemNhieuNhat: listXemNhieu,
    Top10ChuyenMuc: listChuyenMuc,
    emptyNoiBat: listNoiBat.length === 0,
    emptyXemNhieu: listXemNhieu.length === 0,
    emptyMoiNhat: listMoiNhat.length === 0,
    emptyChuyenMuc: listChuyenMuc.length === 0,
  });
});

router.get("/newslist/idChuyenMucPhu/:id", async function (req, res) {
  const idChuyenMucPhu = req.params.id || 1;
  const limit = 6;
  const page = req.query.page || 1;
  if (page < 1) page = 1;
  const total = await news.countChuyenMucPhu(idChuyenMucPhu);
  let nPages = Math.floor(total / limit);
  if (total % limit > 0) nPages++;
  const page_numbers = [];
  for (i = 1; i <= nPages; i++) {
    page_numbers.push({
      value: i,
      isCurrent: i === +page,
    });
  }

  const offset = (page - 1) * limit;

  const listTag = await news.LayTagBaiBao();
  const listUniqueTag = await news.LayDanhSachTag();
  const listMoiNhat = await news.Top10MoiNhat();
  const listXemNhieu = await news.Top10XemNhieuNhat();
  const listBaiBao = await news.LayDanhSachBaiVietTheoChuyenMucPhu(
    idChuyenMucPhu,
    offset
  );
  const listCMC = await news.LayDanhSachChuyenMucChinh();
  const listCMP = await news.LayDanhSachChuyenMucPhu();
  req.session.listCMC = listCMC;
  req.session.listCMP = listCMP;
  if (!res.locals.listCMC) {
    res.locals.listCMC = listCMC;
  }
  if (!res.locals.listCMP) {
    res.locals.listCMP = listCMP;
  }
  res.render("newsView/newslist_CMP", {
    listBaiBao: listBaiBao,
    listTag: listTag,
    emptyList: listBaiBao === 0,
    page_numbers,
    listUniqueTag: listUniqueTag,
    Top10MoiNhat: listMoiNhat,
    Top10XemNhieuNhat: listXemNhieu,
  });
});

router.get("/newslist/idTag/:id", async function (req, res) {
  const idTag = req.params.id || 1;
  const limit = 6;
  const page = req.query.page || 1;
  if (page < 1) page = 1;
  const total = await news.countTag(idTag);
  let nPages = Math.floor(total / limit);
  if (total % limit > 0) nPages++;
  const page_numbers = [];
  for (i = 1; i <= nPages; i++) {
    page_numbers.push({
      value: i,
      isCurrent: i === +page,
    });
  }

  const offset = (page - 1) * limit;

  const listTag = await news.LayTagBaiBao();
  const listUniqueTag = await news.LayDanhSachTag();
  const listMoiNhat = await news.Top10MoiNhat();
  const listXemNhieu = await news.Top10XemNhieuNhat();
  const listBaiBao = await news.LayDanhSachBaiVietTheoTag(idTag, offset);
  const listCMC = await news.LayDanhSachChuyenMucChinh();
  const listCMP = await news.LayDanhSachChuyenMucPhu();
  req.session.listCMC = listCMC;
  req.session.listCMP = listCMP;
  if (!res.locals.listCMC) {
    res.locals.listCMC = listCMC;
  }
  if (!res.locals.listCMP) {
    res.locals.listCMP = listCMP;
  }
  res.render("newsView/newslist_Tag", {
    listBaiBao: listBaiBao,
    listTag: listTag,
    emptyList: listBaiBao === 0,
    listUniqueTag: listUniqueTag,
    page_numbers,
    Top10MoiNhat: listMoiNhat,
    Top10XemNhieuNhat: listXemNhieu,
  });
});

router.get("/newslist/idChuyenMucChinh/:id", async function (req, res) {
  const idChuyenMucChinh = req.params.id || 1;
  const limit = 6;
  const page = req.query.page || 1;
  if (page < 1) page = 1;
  const total = await news.countChuyenMucChinh(idChuyenMucChinh);
  let nPages = Math.floor(total / limit);
  if (total % limit > 0) nPages++;
  const page_numbers = [];
  for (i = 1; i <= nPages; i++) {
    page_numbers.push({
      value: i,
      isCurrent: i === +page,
    });
  }

  const offset = (page - 1) * limit;

  const listTag = await news.LayTagBaiBao();
  const listUniqueTag = await news.LayDanhSachTag();
  const listMoiNhat = await news.Top10MoiNhat();
  const listXemNhieu = await news.Top10XemNhieuNhat();
  const listBaiBao = await news.LayDanhSachBaiVietTheoChuyenMucChinh(
    idChuyenMucChinh,
    offset
  );
  const listCMC = await news.LayDanhSachChuyenMucChinh();
  const listCMP = await news.LayDanhSachChuyenMucPhu();
  req.session.listCMC = listCMC;
  req.session.listCMP = listCMP;
  if (!res.locals.listCMC) {
    res.locals.listCMC = listCMC;
  }
  if (!res.locals.listCMP) {
    res.locals.listCMP = listCMP;
  }
  res.render("newsView/newslist_CMC", {
    listBaiBao: listBaiBao,
    listTag: listTag,
    emptyList: listBaiBao === 0,
    page_numbers,
    listUniqueTag: listUniqueTag,
    Top10MoiNhat: listMoiNhat,
    Top10XemNhieuNhat: listXemNhieu,
  });
});

router.get("/newslist", async function (req, res) {
  var textSearch = req.query.search || "nullllll";
  const limit = 6;
  const page = req.query.page || 1;
  if (page < 1) page = 1;
  const total = await news.countSearch(textSearch);
  let nPages = Math.floor(total / limit);
  if (total % limit > 0) nPages++;
  const page_numbers = [];
  for (i = 1; i <= nPages; i++) {
    page_numbers.push({
      search: textSearch,
      value: i,
      isCurrent: i === +page,
    });
  }
  console.log(page_numbers);
  const offset = (page - 1) * limit;
  const listBaiBao = await news.search(textSearch, offset);
  const listTag = await news.LayTagBaiBao();
  const listUniqueTag = await news.LayDanhSachTag();
  const listMoiNhat = await news.Top10MoiNhat();
  const listXemNhieu = await news.Top10XemNhieuNhat();
  const listCMC = await news.LayDanhSachChuyenMucChinh();
  const listCMP = await news.LayDanhSachChuyenMucPhu();
  req.session.listCMC = listCMC;
  req.session.listCMP = listCMP;
  if (!res.locals.listCMC) {
    res.locals.listCMC = listCMC;
  }
  if (!res.locals.listCMP) {
    res.locals.listCMP = listCMP;
  }
  res.render("newsView/newslist_search", {
    listBaiBao: listBaiBao[0],
    listTag: listTag,
    emptyList: listBaiBao === 0,
    page_numbers,
    listUniqueTag: listUniqueTag,
    Top10MoiNhat: listMoiNhat,
    Top10XemNhieuNhat: listXemNhieu,
  });
});

router.get("/newscontent/:id", async function (req, res) {
  const newsID = +req.params.id;
  const listTag = await news.LayTagBaiBao();
  const details = await news.ChiTietBaiViet(newsID);
  if (details === null) {
    console.log("ID k ton tai");
    return res.redirect("/news/home");
  }
  const related5 = await news.LayNgauNhien5BaiCungChuyenMuc(
    details.idChuyenMucPhu || 1
  );
  const comments = await news.LayBinhLuanCuaBaiViet(newsID);
  const cmts = comments[0];
  const result = await news.TangView(newsID);
  const listMoiNhat = await news.Top10MoiNhat();
  const listXemNhieu = await news.Top10XemNhieuNhat();
  const listCMC = await news.LayDanhSachChuyenMucChinh();
  const listCMP = await news.LayDanhSachChuyenMucPhu();
  req.session.listCMC = listCMC;
  req.session.listCMP = listCMP;
  if (!res.locals.listCMC) {
    res.locals.listCMC = listCMC;
  }
  if (!res.locals.listCMP) {
    res.locals.listCMP = listCMP;
  }
  // console.log("res", result);
  if (result === null) {
    console.log("ID k ton tai");
    return res.redirect("/news/home");
  }
  if (details === null) {
    return res.redirect("/news/home");
  }
  let allowRead = false;
  if (details.Premium === 1) {
    if (req.session.auth) {
      if (req.session.authUser.LoaiNguoiDung === "admin") {
        allowRead = true;
      } else if (req.session.authUser.LoaiNguoiDung === "subscriber") {
        if (new Date(req.session.authUser.NgayHetHan) > new Date()) {
          allowRead = true;
          console.log("ConHan");
        } else {
          const thuHoi = await users.ThuHoiSubscriber(
            req.session.authUser.idNguoiDung
          );
          console.log("HetHan", thuHoi);
        }
      }
    }
  } else {
    allowRead = true;
  }

  res.render("newsView/newscontent", {
    details: details,
    listTag: listTag,
    comments: cmts,
    cmt_count: cmts.length,
    related5: related5,
    emptyList: details === 0,
    allowRead,
    Top10MoiNhat: listMoiNhat,
    Top10XemNhieuNhat: listXemNhieu,
  });
});

router.post("/newscontent/:id", async function (req, res) {
  const newsID = +req.params.id;
  const now = new Date();
  if (req.session.auth) tenNguoiDung = req.session.authUser.HoTen;
  else tenNguoiDung = req.body.tenNguoiDung;
  const cmt = {
    tenNguoiDung,
    idBaiBao: newsID,
    ThoiGianBinhLuan: date.format(now, "YYYY-MM-DD HH:mm:ss"),
    NoiDung: req.body.NoiDung,
  };
  console.log("cmt", cmt);
  const result = await news.AddComment(cmt);

  if (result === null) {
    console.log("Lỗi add cmt");
    return res.redirect("/news/home");
  }
  res.redirect("/news/newscontent/" + newsID);
});

module.exports = router;
