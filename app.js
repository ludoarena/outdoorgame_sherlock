require("module-alias/register");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const Sequelize = require("@database/sequelize");

const app = express();
const port = 3000;

/*
// Connection to the database
sequelize
  .authenticate()
  .then((_) => console.log(`Success to connect the database`))
  .catch((error) =>
    console.error(`Impossible to connect the database : ${error}`),
  );
*/

// Middleware
app
  .use(favicon(__dirname + "/public/favicon_investigation.jpg"))
  .use(morgan("dev"))
  .use((req, res, next) => {
    console.log("Content-Type:", req.headers["content-type"]);
    next();
  })
  .use(bodyParser.json());

// create and initialize the database with sample data
Sequelize.initializeDataBase();

// API endpoint
require("@routes/findAllUsers")(app);
require("@routes/findUserByPk")(app);
require("@routes/createUser")(app);
require("@routes/updateUser")(app);
require("@routes/deleteUser")(app);

// Manage error 404
app.use(({ res }) => {
  const message =
    "Unable to find the requested resource. You can try another URL.";
  res.status(404).json({ message });
});

// launch the server on port 3000
app
  .listen(port)
  .on("listening", () => {
    console.log(`Server running on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Failed to start:", err);
  });
