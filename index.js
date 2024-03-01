//INDEX.JS

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set the views directory
app.set("views", "./views");

// Register the template engine
app.set("view engine", "perscholas");

// Middleware to log incoming requests
app.use((req, res, next) => {
  const time = new Date();
  console.log(
    `-----\n${time.toLocaleTimeString()}: Received a ${req.method} request to ${
      req.url
    }.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

// Route to render the template view
app.get("/", (req, res) => {
  const options = {
    title: "SWEET SELECTIONS",
    content: "TESTING DATA",
  };

  // Read the template file and render it
  fs.readFile("./views/index.perscholas", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }
    const rendered = data
      .toString()
      .replace(/#title#/, options.title)
      .replace(/#content#/, options.content);
    res.send(rendered);
  });
});

// Middleware for handling 404 - Resource Not Found
app.use((req, res, next) => {
  res.status(404).send("Resource Not Found");
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});


//--------------------------------------------END CODE------------------------------------------//