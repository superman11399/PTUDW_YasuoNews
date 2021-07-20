const authen = require("../models/authen.model");

module.exports = function (app) {
  app.get("/", function (req, res) {
    // res.send('<b>Hello</b> World!');
    res.redirect("/news");
    // res.redirect('/admin');
  });

  app.use("/news/", require("../controllers/news.route"));
  app.use("/account/", require("../controllers/account.route"));
  app.use("/admin/", require("../controllers/admin.route"));
  app.use("/writer/", authen.isWriter, require("../controllers/writer.route"));
  app.use("/editor/", authen.isEditor, require("../controllers/editor.route"));
};
