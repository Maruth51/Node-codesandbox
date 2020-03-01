const sequelize = require("sequelize");

const classDB = new sequelize(process.env.DB_URL);

classDB
  .authenticate()
  .then(() => {
    console.log("connection successfully");
  })
  .catch(err => {
    console.log("Connection Error");
    console.error(err);
  });

module.exports = classDB;
