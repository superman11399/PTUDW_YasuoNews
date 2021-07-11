passport = require('passport')

module.exports = function (app, passport) {
  app.get('/', function (req, res) {
    // res.send('<b>Hello</b> World!');
    // res.render('home');
    res.redirect('/admin');
  });
  
  app.use('/news/', require('../controllers/news.route'));
  app.use('/account/', require('../controllers/account.route'));
  app.use('/admin/', require('../controllers/admin.route'));
}
