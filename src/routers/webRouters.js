const express = require("express");
const studentModel = require("../models/studentModel");
const teacherModel = require("../models/Teachers");
const getTeachers = require("../retriveData");

const webRouter = express.Router();

webRouter
  .get("/students", async (req, res) => {
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
    try {
      const students = await studentModel.findAll({ raw: true });
      console.log(students);
      res.render("students", {
        layout: "navigationbar",
        pageTitle: "Students Page",
        students
      });
    } catch {
      res.status(400).send("Some Error ocuured");
    }
  })

  .get("/addStudents", (req, res) => {
    res.render("addStudents", {
      layout: "navigationbar",
      pageTitle: "Add Students"
    });
  })
  .get("/edit-student/:id", (req, res) => {
    const { id } = req.params;
    console.log("students", students);
    console.log("id in parms " + id);
    const requiredStudent = students.find(student => {
      if (parseInt(id, 10) === student.id) return true;
      else return false;
    });
    if (requiredStudent) {
      res.render("addStudents", {
        layout: "navigationbar",
        pageTitle: "Edit Student",
        student: requiredStudent,
        mode: "edit",
        studentID: requiredStudent.id
      });
    } else res.status(400).send("Requested Student not found");
  })
  .get("/teachers", async (req, res) => {
    try {
      const teachers = await teacherModel.findAll({ raw: true });
      console.log(teachers);
      res.render("teachers", {
        layout: "navigationbar",
        teachers,
        pageTitle: "Teachers"
      });
    } catch {
      res.send("Error Page");
    }
  })
  .get("/teacher/:id", (req, res) => {
    const { id = "" } = req.params;
    getTeachers("https://9y9k5.sse.codesandbox.io/teacher/" + id)
      .then(response => {
        const teacherData = response.data.requestedTeacher;
        console.log(response.data);
        res.render("teacherProfile", {
          layout: "navigationbar",
          teacher: teacherData,
          pageTitle: "Teacher Profile"
        });
      })
      .catch(error => {
        console.log(error);
        res.status(400);
      });
  })

  .get("/teacher/:id", (req, res) => {
    const { id = "" } = req.params;
    getTeachers("https://9y9k5.sse.codesandbox.io/teacher/" + id)
      .then(response => {
        const teacherData = response.data.requestedTeacher;
        console.log(response.data);
        res.render("teacherProfile", {
          layout: "navigationbar",
          teacher: teacherData,
          pageTitle: "Teacher Profile"
        });
      })
      .catch(error => {
        console.log(error);
        res.status(400);
      });
  });

module.exports = webRouter;
