const jwt = require("jsonwebtoken");

const createToken = payload => {
  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "5h" });
};

const verifyToken = token => {
  try {
    const data = jwt.verify(token, process.env.JWT_KEY);
    console.log(data);
    return data;
  } catch (e) {
    console.error(e);
    return false;
  }
};
module.exports = { createToken, verifyToken };
