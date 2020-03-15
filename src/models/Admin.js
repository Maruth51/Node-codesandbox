const Sequelize = require("sequelize");
const classDB = require("../config/classDB");
const { generateHashSync } = require("../services/hashingService");

const Admin = classDB.define(
  "admin",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    setterMethods: {
      password(plainTextPassword) {
        this.setDataValue("password", generateHashSync(plainTextPassword));
      }
    }
  }
);

const newAdmin = {
  email: "test@gmail.com",
  password: "password!"
};

// Admin.sync({ force: false })
//   .then(() => {
//     console.log("table created");
//     return Admin.create(newAdmin);
//   })
//   .then(result => {
//     console.log(result.get());
//   })
//   .catch(console.error);

module.exports = Admin;
