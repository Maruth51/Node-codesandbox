const unirest = require("unirest");

const networkCallback = () => {
  return new Promise((resolve, reject) => {
    unirest
      .get("https://promise-ex.free.beeceptor.com")
      .then(resolve)
      .catch(reject);
  });
};

networkCallback()
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log("error occured");
  });
