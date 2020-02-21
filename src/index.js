const express = require("express");
const bodyParser = require("body-parser");
const students = require("./models/students");
const studentsrouter = require("./routers/studentsrouter");
const studentrouter = require("./routers/studentrouter");
const path = require("path");
const getTeachers = require("./retriveData");
const expressHbs = require("express-handlebars");
const formatIndex = require("./views/helpers/formatIndex");
const genLink = require("./views/helpers/genLink");
const app = express();

const hbs = expressHbs.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "./views/layouts"),
  partialsDir: path.join(__dirname, "./views/partials"),
  helpers: {
    formatIndex
  }
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./views"));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   // res.send("Response from Middleware");
//   req.customKey = "Value set in the middleware";
//   next();
// });
app.use("/students", studentsrouter);
app.use("/student", studentrouter);

app.get("/", (req, res) => {
  res.render("home", {
    layout: "hero",
    pageTitle: "Home Page"
  });
});
app.get("/web/teachers", (req, res) => {
  getTeachers("https://9y9k5.sse.codesandbox.io/teachers")
    .then(response => {
      const teachersData = response.data.teacher;
      console.log(response.data);
      console.log(response.data.teacher);
      res.render("teachers", {
        layout: "navigationbar",
        teachers: teachersData,
        pageTitle: "Teachers",
        helpers: { genLink }
      });
    })
    .catch(error => {
      console.log(error);
      res.status(400);
    });
});

app.get("/web/students", (req, res) => {
  /**
   * Express is smart enough to figure out the
   * response header's MIME type
   */
  // res.send(students);
  // res.send("<h1>Hello</h1>")

  /**
   * Multiple properties of the same object of the express modules
   * can be chained together
   */
  // res.status(200);
  // res.json({students}); // These two statements can be chained together

  /**
   * It's a good practice to be explicit
   * of the status codes and response types
   */
  res.render("students", {
    layout: "navigationbar",
    pageTitle: "Students Page",
    students
  });
});

app.post("/students", (req, res) => {
  if (req.body.id && req.body.firstName) {
    students.push(req.body);
    res.status(200).json({ message: "Student created successfully" });
  } else {
    res.status(400).send("Bad Request");
  }
});

app.get("/student/:id", (req, res) => {
  // const studentId = req.params.id;
  const { id = "" } = req.params;
  const requiredStudent = students.find(student => {
    if (parseInt(id) === student.id) return true;
    else return false;
  });
  res.status(200).json({ student: requiredStudent });
});

const server = app.listen(8080, () => {
  console.log(`Server running in port ${server.address().port}`);
});
