const { normalizeUnits } = require("moment");
const authen = require("../models/authen.model");
module.exports = function (app) {
  app.get("/", function (req, res) {
    res.redirect("/news");
  });
  app.get("/forbidden", function (req, res) {
    res.render("error/403", {
      url: req.url,
      layout: null,
    });
  });

  app.use("/news/", require("../controllers/news.route"));
  app.use("/account/", require("../controllers/account.route"));
  app.use("/admin/", authen.isAdmin, require("../controllers/admin.route"));
  app.use("/writer/", authen.isWriter, require("../controllers/writer.route"));
  app.use("/editor/", authen.isEditor, require("../controllers/editor.route"));
  app.get("*", function (req, res) {
    res.status(404);
    res.render("error/404", {
      url: req.url,
      layout: null,
    });
  });
};
