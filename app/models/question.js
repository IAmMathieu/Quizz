const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

class Question extends Model {}
Question.init(
  {
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    anecdote: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    wiki: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    tableName: "question",
  }
);


module.exports = Question;
