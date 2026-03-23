const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const { Sequelize } = require("sequelize");
const { success, getUniqueID } = require("./helper.js");
let USERS = require("./mock-user.js");

const app = express();
const port = 3000;

// Client for database
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    dialect: "postgres",
    logging: console.log,
  },
);

sequelize
  .authenticate()
  .then((_) => console.log(`Success to connect the database`))
  .catch((error) =>
    console.error(`Impossible to connect the database : ${error}`),
  );

// Middleware
app
  .use(favicon(__dirname + "/public/favicon_investigation.jpg"))
  .use(morgan("dev"))
  .use((req, res, next) => {
    console.log("Content-Type:", req.headers["content-type"]);
    next();
  })
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

// launch the server on port 3000
app
  .listen(port)
  .on("listening", () => {
    console.log(`Server running on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Failed to start:", err);
  });
