const { Sequelize, DataTypes } = require("sequelize");
const userModel = require("@models/user.js");
const USERS = require("@database/mock-user.js");

// manage environment variable acording to stage
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

// Create client for database
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

// Sequelize model
const User = userModel(sequelize, DataTypes);

// synchronization models <-> BDD and populate the database with sample
const initializeDataBase = () => {
  const forceSync = process.env.NODE_ENV === "development";
  return sequelize.sync({ force: forceSync }).then((_) => {
    console.log(`The database "User" is synchronized`);

    USERS.map((user) => {
      User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }).then((newUser) =>
        console.log(
          `create new user ${JSON.stringify(newUser.toJSON(), null, 2)}`,
        ),
      );
    });
  });
};

module.exports = {
  initializeDataBase,
  User,
};
