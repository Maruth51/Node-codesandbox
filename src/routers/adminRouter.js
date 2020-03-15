const express = require("express");
const Admin = require("../models/Admin");
const { createToken } = require("../services/jwtServices");
const adminRouter = express.Router();
const { compareHash } = require("../services/hashingService");
adminRouter
  .post("/login", (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    Admin.findOne({ where: { email: email } }).then(result => {
      if (!result) {
        res.send("invaild email Id");
      } else {
        const { password: passwordHash } = result.get();
        compareHash(password, passwordHash).then(result => {
          if (result) {
            const jsonToken = createToken({ sub: "admin", email });
            res.cookie("jwt", jsonToken, { httpOnly: true });
            res.redirect("/");
          } else {
            res.send("invalid User");
          }
        });
      }
    });
  })
  .get("/", (req, res) => {
    res.render("admin", {
      layout: "hero",
      pageTitle: "Admin Login"
    });
  });

module.exports = adminRouter;
