const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const { success, getUniqueID } = require("./helper.js");
let USERS = require("./mock-user.js");

const app = express();
const port = 3000;

// Middleware
app
  .use(favicon(__dirname + "/public/favicon_investigation.jpg"))
  .use(morgan("dev"))
  .use(bodyParser.json());

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
  USERS.push(newUser);
  const message = `Success to create the new user ${newUser.name}`;
  res.json(success(message, newUser));
});

// PUT : update a new USER
app.put("/api/users/:id", (req, res) => {
  const id = +req.params.id;
  const userIndex = USERS.findIndex((user) => +user.id === id);

  const updatedUser = { ...req.body, ...{ id: id } };
  console.log(`${JSON.stringify(updatedUser)}`);
  USERS[userIndex] = updatedUser;

  const message = `{Success to update the user ${updatedUser.name}; id : ${id}}`;
  res.json(success(message, updatedUser));
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
