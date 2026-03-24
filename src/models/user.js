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
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "first_name",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
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
