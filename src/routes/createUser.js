const { User } = require("@database/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");

module.exports = (app) => {
  app.post("/api/users", async (req, res) => {
    try {
      const user = await User.create(req.body);

      return res.status(201).json({
        message: `Success to create the new user ${user.firstName} ${user.lastName}`,
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
          "The user could not be added. Please try again in a few moments.",
        data: error.message,
      });
    }
  });
};
