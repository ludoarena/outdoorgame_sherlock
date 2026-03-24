const { User } = require("@database/sequelize");

module.exports = (app) => {
  app.get("/api/users/:id", (req, res) => {
    User.findByPk(req.params.id)
      .then((user) => {
        if (user === null) {
          const message =
            "The requested user does not exist. Please try again with another ID.";
          return res.status(404).json({ message });
        }
        const message = "User is found.";
        res.json({ message, data: user });
      })
      .catch((error) => {
        const message =
          "The user could not be retrieved. Please try again in a few moments.";
        res.status(500).json({ message, data: error.message });
      });
  });
};
