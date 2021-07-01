const express = require('express');
const news = require('../models/news.model');
const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/news/home");
});

router.get('/home', async function (req, res) {
  const listNoiBat = await news.BaiVietNoiBat();
  const listMoiNhat = await news.Top10MoiNhat();
  const listXemNhieu = await news.Top10XemNhieuNhat();
  const listChuyenMuc = await news.Top10ChuyenMuc();
  res.render('home', {
    BaiVietNoiBat: listNoiBat,
    Top10MoiNhat: listMoiNhat,
    Top10XemNhieuNhat: listXemNhieu,
    Top10ChuyenMuc: listChuyenMuc,
    emptyNoiBat: listNoiBat.length === 0,
    emptyXemNhieu: listXemNhieu.length === 0,
    emptyMoiNhat: listMoiNhat.length === 0,
    emptyChuyenMuc: listChuyenMuc.length === 0
  });
});

router.get('/newslist/idChuyenMucPhu/:id',async function (req, res) {
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
      isCurrent: i === +page
    });
  }

  const offset = (page - 1) * limit;

  const listTag = await news.LayTagBaiBao();
  const listBaiBao = await news.LayDanhSachBaiVietTheoChuyenMucPhu(idChuyenMucPhu,offset);
  res.render('newsView/newslist', {
      listBaiBao: listBaiBao,
      listTag: listTag,
      emptyList: listBaiBao===0,
      page_numbers
  });
});

router.get('/newslist/idTag/:id',async function (req, res) {
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
      isCurrent: i === +page
    });
  }

  const offset = (page - 1) * limit;

  const listTag = await news.LayTagBaiBao();
  const listBaiBao = await news.LayDanhSachBaiVietTheoTag(idTag,offset);
  res.render('newsView/newslist', {
      listBaiBao: listBaiBao,
      listTag: listTag,
      emptyList: listBaiBao===0,
      page_numbers
  });
});

router.get('/newslist/idChuyenMucChinh/:id',async function (req, res) {
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
      isCurrent: i === +page
    });
  }

  const offset = (page - 1) * limit;

  const listTag = await news.LayTagBaiBao();
  const listBaiBao = await news.LayDanhSachBaiVietTheoChuyenMucChinh(idChuyenMucChinh,offset);
  res.render('newsView/newslist', {
      listBaiBao: listBaiBao,
      listTag: listTag,
      emptyList: listBaiBao===0,
      page_numbers
  });
});

router.get('/newslist/idTag/:id',async function (req, res) {
  const listTag = await news.LayTagBaiBao();
  const listBaiBao = await news.LayDanhSachBaiVietTheoTag(req.params.id);
  res.render('newsView/newslist', {
    listBaiBao: listBaiBao,
    listTag:listTag,
    emptyList: listBaiBao===0,
  });
});

router.get('/newscontent', function (req, res) {
  res.render('newsView/newscontent');
});



module.exports = router;