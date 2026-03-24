const { User } = require("@database/sequelize");

module.exports = (app) => {
  app.get("/api/users/:id", (req, res) => {
    User.findByPk(req.params.id).then((user) => {
      const message = "User is found.";
      res.json({ message, data: user });
    });
  });
};
