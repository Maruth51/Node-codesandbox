const axios = require("axios");

const getteachers = url => {
  axios
    .get(url)
    .then(response => {
      return response;
    })
    .catch(error => {
      return false;
    });
};

module.exports = getteachers;
