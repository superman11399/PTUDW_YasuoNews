const express = require("express");
const morgan = require("morgan");
var hbs = require("handlebars");
const passport = require("passport");
var flash = require("connect-flash");

const app = express();

app.use(morgan("dev"));

hbs.registerHelper("dateFormat", require("handlebars-dateformat"));
hbs.registerHelper("ifEquals", function (arg1, arg2, options) {
  //console.log(arg1, arg2);
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(__dirname + "/public"));
app.use("/account/", express.static(__dirname + "/public"));
app.use("/news/", express.static(__dirname + "/public"));
app.use(
  "/news/newslist/idChuyenMucChinh",
  express.static(__dirname + "/public")
);
app.use("/news/newslist/idChuyenMucPhu", express.static(__dirname + "/public"));
app.use("/news/newslist/idTag", express.static(__dirname + "/public"));
app.use("/news/newscontent", express.static(__dirname + "/public"));
app.use("/admin/", express.static(__dirname + "/public"));
app.use("/writer/", express.static(__dirname + "/public"));

require("./middlewares/session.mdw")(app);
require("./middlewares/view.mdw")(app);
require("./middlewares/locals.mdw")(app);
require("./middlewares/passport.mdw.js")(app);
app.use(flash());
require("./middlewares/routes.mdw.js")(app);

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`EC Web App listening at http://localhost:${PORT}`);
});
