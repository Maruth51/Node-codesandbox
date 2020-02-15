const fileWritesysten = (text, completeCallback) => {
  setTimeout(() => {
    console.log("file written sucesdfully");
    completeCallback("success");
  });
};

console.log("Hello");
const textTowrite = "";
fileWritesysten("index j file name", status => {
  console.log(`asych function compleyted ${status}`);
});
