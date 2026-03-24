const { User } = require("@database/sequelize");

module.exports = (app) => {
  app.delete("/api/users/:id", (req, res) => {
    User.findByPk(req.params.id).then((user) => {
      const deletedUser = user;

      return User.destroy({ where: { id: user.id } }).then(() => {
        const message = `The user (id:${deletedUser.id}) has been deleted.`;
        res.json({ message, data: deletedUser });
      });
    });
  });
};
