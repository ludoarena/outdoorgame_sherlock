const { User } = require("@database/sequelize");

module.exports = (app) => {
  app.post("/api/users", (req, res) => {
    User.create(req.body).then((user) => {
      const message = `Success to create the new user ${req.body.firstName} ${req.body.lastName}`;
      res.json({ message, data: user });
    });
  });
};
