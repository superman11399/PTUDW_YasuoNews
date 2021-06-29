const express = require('express');

const router = express.Router();

router.get('/newscontent', function (req, res) {
  res.render('newsView/newscontent');
});

router.get('/newslist', function (req, res) {
    res.render('newsView/newslist');
  });

module.exports = router;