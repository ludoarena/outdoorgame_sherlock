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

// TODO : modify ASAP endpoint to connect with database.
// Previously, data coming from a mock in JS.
// Previous code keeps in comment to make easier the future changes
/*
app.get("/", (req, res) => res.send("Hello, Express dans local host 2"));

// GET ALL USERS
app.get("/api/users/", (req, res) => {
  const message = "The full list of users is found.";
  res.json(success(message, USERS));
});

// GET USER by ID
app.get("/api/users/:id", (req, res) => {
  const id = +req.params.id;
  const user = USERS.find((user) => +user.id === id);
  const message = "User is found.";
  res.json(success(message, user));
});

// POST : create a new USER
app.post("/api/users/", (req, res) => {
  const id = getUniqueID(USERS);
  const newUser = { ...req.body, ...{ id: id } };
  console.log(`req = ${req.body}`);
  console.log(`${JSON.stringify(newUser)}`);
  USERS.push(newUser);
  const message = `Success to create the new user ${newUser.name}`;
  res.json(success(message, newUser));
});

// PUT : update a new USER
app.put("/api/users/:id", (req, res) => {
  const id = +req.params.id;
  const userIndex = USERS.findIndex((user) => +user.id === id);

  const updatedUser = { ...req.body, ...{ id: id } };
  USERS[userIndex] = updatedUser;

  const message = `{Success to update the user ${updatedUser.name}; id : ${id}}`;
  res.json(success(message, updatedUser));
});

// DELETE : delete a user
app.delete("/api/users/:id", (req, res) => {
  const id = +req.params.id;
  const userIndex = USERS.findIndex((user) => +user.id === id);
  const deletedUser = USERS[userIndex];

  USERS.splice(userIndex, 1);

  const message = `{Success to delete the user ${deletedUser.name}; id : ${id}}`;
  res.json(success(message, deletedUser));
});
  */

// launch the server on port 3000
app
  .listen(port)
  .on("listening", () => {
    console.log(`Server running on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Failed to start:", err);
  });
