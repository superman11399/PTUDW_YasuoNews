module.exports = function (app) {
  app.get("/", function (req, res) {
    res.redirect("/news/home");
  });

  app.use("/news/", require("../controllers/news.route"));
  app.use("/account/", require("../controllers/account.route"));
  app.use("/admin/", require("../controllers/admin.route"));
  app.use("/writer/", require("../controllers/writer.route"));
  app.use("/editor/", require("../controllers/editor.route"));
};
