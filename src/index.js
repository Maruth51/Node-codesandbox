const express = require("express");
const bodyParser = require("body-parser");
const students = require("./models/students");
const studentsrouter = require("./routers/studentsrouter");
const studentrouter = require("./routers/studentrouter");
const adminRouter = require("./routers/adminRouter");
const path = require("path");
const expressHbs = require("express-handlebars");

//helpers

const formatIndex = require("./views/helpers/formatIndex");
const genLink = require("./views/helpers/genLink");
const toTitlecase = require("./views/helpers/toTitlecase");
const ifEqual = require("./views/helpers/ifEqual");
const app = express();

const webRouter = require("./routers/webRouters");
const hbs = expressHbs.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "./views/layouts"),
  partialsDir: path.join(__dirname, "./views/partials"),
  helpers: {
    formatIndex,
    ifEqual,
    toTitlecase,
    genLink
  }
});
app.use("/web", webRouter);
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   // res.send("Response from Middleware");
//   req.customKey = "Value set in the middleware";
//   next();
// });
app.use("/students", studentsrouter);
app.use("/student", studentrouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.render("home", {
    layout: "hero",
    pageTitle: "Home Page"
  });
});

const server = app.listen(8080, () => {
  console.log(`Server running in port ${server.address().port}`);
});
