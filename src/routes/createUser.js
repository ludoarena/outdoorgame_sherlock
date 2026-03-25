const { User } = require("@database/sequelize");
const { ValidationError } = require("sequelize");

module.exports = (app) => {
  app.post("/api/users", (req, res) => {
    User.create(req.body)
      .then((user) => {
        const message = `Success to create the new user ${req.body.firstName} ${req.body.lastName}`;
        res.json({ message, data: user });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message =
          "The user could not be added. Please try again in a few moments.";
        res.status(500).json({ message, data: error.message });
      });
  });
};
