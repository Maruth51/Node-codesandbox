const axios = require("axios").default;

const getteachers = url => {
  return axios.get(url);
};

module.exports = getteachers;
