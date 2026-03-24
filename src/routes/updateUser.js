const { User } = require("@database/sequelize");

module.exports = (app) => {
  app.put("/api/users/:id", (req, res) => {
    const id = req.params.id;

    User.update(req.body, { where: { id: id } })
      .then(() => {
        return User.findByPk(id);
      })
      .then((user) => {
        const message = `Success to update the user ${req.body.firstName} ${req.body.lastName}`;
        res.json({ message, data: user });
      });
  });
};
