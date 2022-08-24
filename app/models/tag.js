const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

class Tag extends Model {}
Tag.init(
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    tableName: "tag",
  }
);

module.exports = Tag;
