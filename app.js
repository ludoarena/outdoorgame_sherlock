const express = require("express");
const { success } = require("./helper.js");
let USERS = require("./mock-user.js");

const app = express();
const port = 3000;

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

// launch the server on port 3000
app
  .listen(port)
  .on("listening", () => {
    console.log(`Server running on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Failed to start:", err);
  });
