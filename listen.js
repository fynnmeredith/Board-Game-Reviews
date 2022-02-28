const { PORT = 9666 } = process.env;
const app = require("./app");

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`server listening on port ${PORT}`);
  }
});
