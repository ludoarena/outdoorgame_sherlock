const { User } = require("@database/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");

module.exports = (app) => {
  app.put("/api/users/:id", async (req, res) => {
    const id = req.params.id;

    try {
      const [updatedRows] = await User.update(req.body, {
        where: { id: id },
      });

      if (updatedRows === 0) {
        return res.status(404).json({
          message: `The user with ID ${id} was not found. Please try with another ID.`,
        });
      }

      const user = await User.findByPk(id);

      const message = `Successfully updated the user ${user.firstName} ${user.lastName}`;
      res.json({ message, data: user });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({
          message: "A user with this firstName and lastName already exists.",
          data: error,
        });
      }

      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }

      res.status(500).json({
        message:
          "The user could not be updated. Please try again in a few moments.",
        error: error.message,
      });
    }
  });
};
