// server.js
// where your node app starts
require("dotenv").config();
// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

// date string endpoint
app.get("/api/date", (req, res) => {
  res.json({ date: new Date() });
});

// timestamp string endpoint
app.get("/api/timestamp/:date_string?", (req, res) => {
  let timestamp = new Date(req.params.date_string);
  if (!req.params.date_string) {
    timestamp = new Date();
    res.json({ date: timestamp });
  } else if (isNaN(timestamp)) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ date: timestamp });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
