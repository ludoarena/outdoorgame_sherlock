const { User } = require("@database/sequelize");

module.exports = (app) => {
  app.post("/api/users", (req, res) => {
    User.create(req.body)
      .then((user) => {
        const message = `Success to create the new user ${req.body.firstName} ${req.body.lastName}`;
        res.json({ message, data: user });
      })
      .catch((error) => {
        const message =
          "The user could not be added. Please try again in a few moments.";
        res.status(500).json({ message, data: error.message });
      });
  });
};
