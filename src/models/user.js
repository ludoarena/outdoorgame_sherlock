module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "last_name",
        validate: {
          notNull: { msg: "The field 'lastName' is mandatory" },
          notEmpty: { msg: "The field 'lastName' cannot be empty" },
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "first_name",
        validate: {
          notNull: { msg: "The field 'firstName' is mandatory" },
          notEmpty: { msg: "The field 'firstName' cannot be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
        validate: {
          notNull: { msg: "The field 'email' is mandatory" },
          notEmpty: { msg: "The field 'email' cannot be empty" },
          isEmail: {
            msg: "Invalid email format. Expected format: name@domain.com (e.g., john.doe@gmail.com)",
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    },
  );
};
