const path = require("path");
const express = require("express");
const app = express();

const PATH = path.join(__dirname, "..", "client");
app.use("/static", express.static(PATH));

const router = require("./router");
app.use(router);

app.listen(3000, function() {
  console.log("App listening on port 3000");
});
