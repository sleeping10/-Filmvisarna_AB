//for webserver to be created
const express = require("express");
//create a webserver using express
const app = express();
//serve all the files in the frontend folder
app.use(express.static("frontend"));
//start the webserver on port 3000
app.listen(process.env.PORT || 3000, () =>
  console.log("//http:localhost:3000")
);
const api = require("./rest-api");
api(app);