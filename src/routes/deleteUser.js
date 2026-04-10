const { User } = require("@database/sequelize");
const auth = require("@auth/auth");

module.exports = (app) => {
  app.delete("/api/users/:id", auth, (req, res) => {
    User.findByPk(req.params.id)
      .then((user) => {
        if (user === null) {
          const message =
            "The requested user does not exist. Please try again with a different identifier.";
          return res.status(404).json({ message: message });
        }

        const deletedUser = user;

        return User.destroy({ where: { id: user.id } }).then(() => {
          const message = `The user (id:${deletedUser.id}) has been deleted.`;
          res.json({ message, data: deletedUser });
        });
      })
      .catch((error) => {
        const message =
          "The user could not be updated. Please try again in a few moments.";
        res.status(500).json({ message, error: error.message });
      });
  });
};
