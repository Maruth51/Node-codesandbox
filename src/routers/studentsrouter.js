const express = require("express");
const student = require("../models/studentModel");

const studentsRouter = express.Router();

studentsRouter
  .get("/", (req, res) => {
    console.log("enterd students router");
    student
      .findAll()
      .then(result => {
        console.log("Db Results", result);
        res.status(200).json(result);
      })
      .catch(err => {
        console.error(err);
        res.send("error occured");
      });
  })

  .post("/", (req, res) => {
    if (req.body.id && req.body.firstName) {
      //students.push(req.body);
      res.status(200).json({ message: "Student created successfully" });
    } else {
      res.status(400).send("Bad Request");
    }
  });

module.exports = studentsRouter;
