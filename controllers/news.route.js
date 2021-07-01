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

router.get('/newslist',async function (req, res) {
  const listTag = await news.LayTagBaiBao();
  if (req.query.idChuyenMucPhu){
    const listBaiBao = await news.LayDanhSachBaiVietTheoChuyenMucPhu(req.query.idChuyenMucPhu);
    res.render('newsView/newslist', {
      listBaiBao: listBaiBao,
      listTag: listTag,
      emptyList: listBaiBao===0,
  });
  }
  if (req.query.idChuyenMucChinh){
    const listBaiBao = await news.LayDanhSachBaiVietTheoChuyenMucChinh(req.query.idChuyenMucChinh);
    res.render('newsView/newslist', {
      listBaiBao: listBaiBao,
      listTag: listTag,
      emptyList: listBaiBao===0,
  });
  }
  if (req.query.idTag){
    const listBaiBao = await news.LayDanhSachBaiVietTheoTag(req.query.idTag);
    res.render('newsView/newslist', {
      listBaiBao: listBaiBao,
      listTag:listTag,
      emptyList: listBaiBao===0,
    });
  }
  
});



router.get('/newscontent', function (req, res) {
  res.render('newsView/newscontent');
});



module.exports = router;