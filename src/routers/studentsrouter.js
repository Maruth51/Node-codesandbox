const express = require("express");
const students = require("../models/students");
const studentrouter = express.Router();

studentrouter
  .get("/", (req, res) => {
    res.status(200).json({ students });
  })

  .post("/", (req, res) => {
    if (req.body.id && req.body.firstName) {
      students.push(req.body);
      res.status(200).json({ message: "Student created successfully" });
    } else {
      res.status(400).send("Bad Request");
    }
  });

module.exports = studentrouter;
