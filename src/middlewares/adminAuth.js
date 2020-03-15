const { verifyToken } = require("../services/jwtServices");

const adminAuth = (req, res, next) => {
  const { jwt } = req.cookies;
  const admin = verifyToken(jwt);
  console.log("it is jwt", jwt);
  if (admin) {
    req.admin = admin;
    next();
  } else {
    res.redirect("/");
  }
};

module.exports = { adminAuth };
