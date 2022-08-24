const { DataTypes, Model } = require("sequelize");
const sequelize = require("../sequelize");

class User extends Model {
  // on crée une classe donc on peut mettre les méthodes qu'on veut 
  // donc c'est un avantage par rapport au sequelize.define(...)
  get fullname() {
    return `${this.firstname} ${this.lastname}`;
  }
}
User.init(
  {
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    firstname: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastname: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    tableName: "user",
  }
);

module.exports = User;
