const { User } = require("@database/sequelize");
const { Op } = require("sequelize");

module.exports = (app) => {
  app.get("/api/users", (req, res) => {
    if (req.query.last_name) {
      const searchedValue = req.query.last_name;
      const limit = parseInt(req.query.limit) || 20;

      if (searchedValue.length < 2) {
        const message = "The search term must contain at least 2 characters.";
        return res.status(400).json({ message });
      }

      return User.findAndCountAll({
        where: {
          lastName: { [Op.like]: `%${searchedValue}%` },
        },
        order: ["lastName"],
        limit: limit,
      }).then(({ count, rows }) => {
        const message = `Il y a ${count} users qui correspondent au terme de la recherche`;
        res.json({ message, data: rows });
      });
    } else {
      User.findAll({ order: ["lastName"] })
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
