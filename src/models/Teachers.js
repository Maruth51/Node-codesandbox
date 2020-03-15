const classDB = require("../config/classDB");

const Sequelize = require("sequelize");

const Teacher = classDB.define("Teacher", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    field: "first_name"
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    field: "last_name"
  },
  emailID: {
    type: Sequelize.STRING,
    allowNull: false,
    field: "email_id",
    unique: true
  },
  class: Sequelize.STRING,
  subject: {
    type: Sequelize.ENUM,
    values: ["Maths", "English", "Physics"],
    allowNull: false
  }
});

const teacherSync = () => {
  Teacher.sync()
    .then(() => {
      console.log("table created");
    })
    .catch(err => {
      console.error(err);
    });

  const newTeacher = {
    firstName: "Barney",
    lastName: "Mosssby",
    emailID: "Bmossby@gmail.com",
    class: "10",
    subject: "Maths"
  };

  Teacher.create(newTeacher)
    .then(res => {
      console.log("data", res.get());
    })
    .catch(err => {
      console.log(err);
    });
};
// Teacher.sync({ force: false })
//   .then(() => {
//     console.log("table created");
//     return Teacher.create(newTeacher);
//   })
//   .then(result => {
//     console.log(result.get());
//   })
//   .catch(console.error);

// Teacher.findOne({
//   where: {
//     email: "test@gmail.com"
//   }
// })
//   .then(teacherInstance => {
//     console.log(teacherInstance.get());
//   })
//   .catch(console.error);
module.exports = Teacher;
