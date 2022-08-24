const Answer = require("./answer");
const Level = require("./level");
const Question = require("./question");
const Quiz = require("./quiz");
const Tag = require("./tag");
const User = require("./user");

// Ici on défini les relations entre nos entités
Question.hasMany(Answer, {
  // on precise à l'orm le nom des champs à utiliser pour trouver les relations car nos nom de champs ne sont pas standard, donc on fait en sorte que l'ORM s'adapte a notre base déjà existante
  foreignKey: "question_id",
  // https://sequelize.org/v6/manual/assocs.html#defining-an-alias
  as: "possibleAnswers",
});
Answer.belongsTo(Question, {
  foreignKey: "question_id",
  as: "question",
});

// la relaton vers la bonne réponse ! 
Question.belongsTo(Answer, {
  foreignKey: "answer_id",
  as: "correctAnswer",
});

// Ici on ne met pas la relation inverse ou equivalente Level -> Question car pas vraiment utile
// On est pas obligé de faire des relation bi directionnelles si ce n'est pas necessaire
Question.belongsTo(Level, {
  foreignKey: "level_id",
  as: "level",
});

Quiz.belongsTo(User, {
  foreignKey: "user_id",
  as: "author",
});
User.hasMany(Quiz, {
  foreignKey: "user_id",
  as: "createdQuizzes",
});

Quiz.hasMany(Question, {
  foreignKey: "quiz_id",
  as: "questions",
});
Question.belongsTo(Quiz, {
    foreignKey: "quiz_id",
    as: "quiz",
})

// Many to many
Quiz.belongsToMany(Tag, {
    as: "tags",
    through: "quiz_has_tag",
    foreignKey: "quiz_id",
    otherKey: "tag_id",
});
Tag.belongsToMany(Quiz, {
    as: "quizzes",
    through: "quiz_has_tag",
    foreignKey: "tag_id",
    otherKey: "quiz_id",
});

module.exports = { Answer, Level, Question, Quiz, Tag, User };
