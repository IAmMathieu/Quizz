const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

class Answer extends Model {}
Answer.init(
  {
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
    tableName: "answer",
  }
);

module.exports = Answer;
