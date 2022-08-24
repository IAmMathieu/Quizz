const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

class Quiz extends Model {}
Quiz.init(
  {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    tableName: "quiz",
  }
);

module.exports = Quiz;
