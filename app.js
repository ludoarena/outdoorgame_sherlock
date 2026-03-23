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
  const id = parseInt(req.params.id);
  const user = USERS.find((user) => +user.id === id);
  const message = "User is found.";
  res.json(success(message, user));
});

// POST : create a new user
app.post("/api/users/", (req, res) => {
  const id = getUniqueID(USERS);
  const newUser = { ...req.body, ...{ id: id, created: new Date() } };
  USERS.push(newUser);
  const message = `Success to create the new user ${newUser.name}`;
  res.json(success(message, newUser));
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
