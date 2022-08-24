const { Model, DataTypes } = require("sequelize");
// on recupère l'objet sequelize qui permet de communiquer avec la BDD
const sequelize = require("../sequelize");

// Avec sequelize un model c'est juste une classe qui hérite de la classe Model de sequelize
class Level extends Model {}
// L'orm a besoin de quelques info pour bien manipuler ce model
// on va les lui fournir avec la methode init
Level.init(
  {
    // premiere info a fournir : quel sont les champs de ce model
    // et pour chaque champs on preciste son nom, son type et d'autre info optionnelles comme par emxeple est ce qu'il peut etre vide (notNull ?)
    name: {
      // pour ce champs "name" on indique à l'ORM que dans le BDD ce sera un champs de type TEXT
      type: DataTypes.TEXT,
      // on indique a l'ORM que dans la BDD ce sera un champs NOT NULL
      allowNull: false,
      // Ici on dit à l'ORM que AVANT d'esssayer d'enregistrer en BDD les valeurs on fait quelque verifications
      validate: {
        // et on verifie aussi qu'elle contient au moin un caractère
        notEmpty: true, // !== ""
      },
    },
  },
  {
    // on fourni a notre model l'objet sequelize qui lui permettra de communiquer avec la BDD
    sequelize,
    // je fourni a l'ORM le nom de la table qui est en BDD
    tableName: "level",
  }
);

module.exports = Level;
