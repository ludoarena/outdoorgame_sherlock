const { User } = require("@database/sequelize");

module.exports = (app) => {
  app.get("/api/users", (req, res) => {
    User.findAll().then((user) => {
      const message = "The full list of users is found.";
      res.json({ message, data: user });
    });
  });
};
