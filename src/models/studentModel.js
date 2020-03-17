const classDB = require("../config/classDB");
const Sequelize = require("sequelize");
const Teacher = require("./Teachers");

const Student = classDB.define("students", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: Sequelize.STRING,
    field: "first_name",
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    field: "last_name",
    allowNull: false
  },
  gender: {
    type: Sequelize.ENUM,
    values: ["male", "female"],
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  teacherId: {
    type: Sequelize.INTEGER,
    field: "teacher_id",
    allowNull: false,
    references: {
      model: Teacher,
      key: "id",
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

const newStudent = {
  firstName: "Dani",
  lastName: "Akash",
  gender: "male",
  age: 14,
  teacherId: 1
};
const syncStudent = () => {
  Student.sync({ force: false })
    .then(() => {
      console.log("table created");
      return Student.create(newStudent);
    })
    .then(result => {
      console.log(result.get());
    })
    .catch(console.error);
};
module.exports = Student;
