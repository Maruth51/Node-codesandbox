const url = require("url");

function getquery(urlstring) {
  try {
    return url.parse(urlstring, true);
  } catch (e) {
    console.log(e);
  }
}
// import the
module.exports = getquery;
