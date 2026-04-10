const { User } = require("@database/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("@auth/private_key");

module.exports = (app) => {
  app.post("/api/login", async (req, res) => {
    try {
      const { firstName, lastName, password } = req.body;
      const user = await User.findOne({
        where: { firstName: firstName, lastName: lastName },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password." });
      }

      // JWT
      const token = jwt.sign({ userId: user.id }, privateKey, {
        expiresIn: "24h",
      });

      return res.json({
        message: "The user has been successfully logged in.",
        data: user,
        token,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Login failed.", error: error.message });
    }
  });
};
