const express = require("express");
const Admin = require("../models/Admin");
const adminRouter = express.Router();
const { compareHash } = require("../services/hashingService");
adminRouter.post("/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  Admin.findOne({ where: { email: email } }).then(result => {
    if (!result) {
      res.send("invaild email Id");
    } else {
      const { password: passwordHash } = result.get();
      compareHash(password, passwordHash).then(result => {
        if (result) {
          res.cookie();
        } else {
          res.send("invalid User");
        }
      });
    }
  });
});

module.exports = adminRouter;
