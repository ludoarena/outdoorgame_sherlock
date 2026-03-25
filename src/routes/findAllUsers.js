const { User } = require("@database/sequelize");
const { col } = require("sequelize");

module.exports = (app) => {
  app.get("/api/users", (req, res) => {
    if (req.query.last_name) {
      const searchedValue = req.query.last_name;
      return User.findAll({
        where: {
          lastName: searchedValue,
        },
      }).then((users) => {
        const message = `Il y a ${users.length} users qui correspondent au terme de la recherche`;
        res.json({ message, data: users });
      });
    } else {
      User.findAll()
        .then((users) => {
          const message = "The full list of users has been retrieved.";
          res.json({ message, data: users });
        })
        .catch((error) => {
          const message =
            "The list of users could not be retrieved. Please try again in a few moments.";
          res.status(500).json({ message, data: error.message });
        });
    }
  });
};
