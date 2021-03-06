const express = require("express");
const studentModel = require("../models/studentModel");

const studentRouter = express.Router();

studentRouter
  .post("/", async (req, res) => {
    try {
      if (req.body.lastName && req.body.firstName) {
        const { firstName, lastName, gender, age, teacherId = 1 } = req.body;
        const newStudent = await studentModel.create({
          firstName,
          lastName,
          gender,
          age,
          teacherId
        });

        res.status(200).send(newStudent.toJSON());
      } else {
        console.log(req.body);
        res.status(400).send("Bad Request");
      }
    } catch (err) {
      console.error(err);
      res.status(400).send("Bad Request");
    }
  })
  .get("/:id", (req, res) => {
    // const studentId = req.params.id;
    const { id = "" } = req.params;
    const requiredStudent = students.find(student => {
      if (parseInt(id) === student.id) return true;
      else return false;
    });
    res.status(200).json({ student: requiredStudent });
  })
  .patch("/:id", (req, res) => {
    const { id } = req.params;
    //const { firstName, lastName, age, gender, scores } = req.body;
    let requiredStudentIndex;
    const requiredStudent = students.find((student, studentIndex) => {
      if (parseInt(id, 10) === student.id) {
        requiredStudentIndex = studentIndex;
        return true;
      } else return false;
    });
    if (requiredStudent) {
      const {
        firstName = requiredStudent.firstName,
        lastName = requiredStudent.lastName,
        age = requiredStudent.age,
        gender = requiredStudent.gender,
        scores = requiredStudent.scores
      } = req.body;

      students[requiredStudentIndex] = {
        id: parseInt(req.params.id, 10),
        firstName,
        lastName,
        age,
        gender,
        scores
      };
      res.status(200).send("student data updated successfully");
    } else {
      res.status(400).json({ message: "Bad request" });
    }
    console.log(requiredStudent);
    console.log(students[requiredStudentIndex]);
    console.log(req.body);
  })
  .delete("/:id", (req, res) => {
    const { id } = req.params;
    let requiredStudentIndex;
    const requiredStudent = students.find((student, studentIndex) => {
      if (parseInt(id, 10) === student.id) {
        requiredStudentIndex = studentIndex;
        return true;
      }
      return false;
    });
    if (requiredStudent) {
      students.splice(requiredStudentIndex, 1);
      res.status(200).json({ message: "Student has been deleted" });
    } else {
      res.status(400).send("Bad Request");
    }
  });

module.exports = studentRouter;
