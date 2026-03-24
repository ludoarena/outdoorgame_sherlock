const { User } = require("@database/sequelize");

module.exports = (app) => {
  app.get("/api/users", (req, res) => {
    User.findAll()
      .then((user) => {
        const message = "TheThe full list of users has been retrieved.";
        res.json({ message, data: user });
      })
      .catch((error) => {
        const message =
          "The list of users could not be retrieved. Please try again in a few moments.";
        res.status(500).json({ message, data: error.message });
      });
  });
};
