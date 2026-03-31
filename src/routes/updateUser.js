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

      return res.json({
        message: `Successfully updated the user ${user.firstName} ${user.lastName}`,
        data: user,
      });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        const constraintMap = {
          Users_email_key: "This email is already in use",
          unique_fullname: "This fullname is already in use",
        };

        const constraint = error.parent?.constraint;

        const message =
          constraintMap[constraint] ||
          error.parent?.detail ||
          "Duplicate value";

        return res.status(400).json({
          message,
          data: error,
        });
      }

      if (error instanceof ValidationError) {
        const message = error.errors.map((e) => e.message).join(", ");

        return res.status(400).json({
          message,
          data: error,
        });
      }

      return res.status(500).json({
        message:
          "The user could not be updated. Please try again in a few moments.",
        error: error.message,
      });
    }
  });
};
