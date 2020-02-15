var https = require("follow-redirects").https;
var fs = require("fs");

const networlCallback = (
  successCallback = () => null,
  failureCallback = () => null
) => {
  var options = {
    method: "GET",
    hostname: "promise-ex.free.beeceptor.com",
    path: "/",
    headers: {},
    maxRedirects: 20
  };

  var req = https.request(options, function(res) {
    var chunks = [];

    res.on("data", function(chunk) {
      chunks.push(chunk);
    });

    res.on("end", function(chunk) {
      var body = Buffer.concat(chunks);
      successCallback(body.toString());
      console.log(body.toString());
    });

    res.on("error", function(error) {
      failureCallback(error);
      console.error(error);
    });
  });

  req.end();
};

networlCallback(
  data => {
    console.log(data);
  },
  error => {
    console.log("error occured");
  }
);
