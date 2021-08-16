const express = require("express");
const morgan = require("morgan");
var hbs = require("handlebars");
const passport = require("passport");
var flash = require("connect-flash");

const bodyParser = require("body-parser");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
hbs.registerHelper("dateFormat", require("handlebars-dateformat"));
hbs.registerHelper("IfEquals", function (arg1, arg2, options) {
  //console.log(arg1, arg2);
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper("ifIn", function (elem, list, options) {
  console.log("elem", elem, "list", list);
  console.log(typeof list);
  if (list.indexOf(elem) > -1) {
    return options.fn(this);
  }
  return options.inverse(this);
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`EC Web App listening at http://localhost:${PORT}`);
});
