const fileWrite = text => {
  return new Promise((resolve, reject) => {
    console.log(text);
    //cacth will executed whneever error ocured in the promise
    undefined();
    resolve("success");
  });
};

fileWrite("I have write by the function ")
  .then(status => {
    console.log(`file write operation ${status}`);
  })
  .catch(error => {
    console.error("error happend: ");
  });
