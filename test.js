require("dotenv").config();

const { Quiz, User, Answer, Level, Question } = require("./app/models");

const test = async () => {
  /*
  Level.create({
    name: "Epic"
  });
*/



  /*
  const levels = await Level.findAll({
    where: {
      name: "très difficile"
    }
  });

  console.log(levels);
  */



/*
  // EAGER LOADING  = on recupere tout d'un coup (questios et reponses associées)

  // puisque j'ai défini un alias "possibleAnswers" pour la relation Question -> Answer
  // (les relations sont définies dans app/models/index.js)
  // alors lorsque je demande a l'ORM de me recupérer une question
  // je peux lui demander de me recupérer aussi (en une seule requete) les reponses associées à cette question
  // grace à l'option "include: 'nom de la relation'"
  const question = await Question.findByPk(1, { include: "possibleAnswers" });
  // puisque j'ai demander à charger la relation possibleAnswers
  // j'ai le droit d'appler la methode possibleAnswers qui va me recupérer tout les objet answer associés à la question
  console.log(question.question);

  for (const answer of question.possibleAnswers) {
    console.log(answer.description);
  }

  // LAZY LOADING : tu recupere seuelement si t'en a vraiment besoin
  // Moins performant car plus de requetes

  // je ne demande pas a recuprer la relation possibleAnswers en meme temps que la question
  const question2 = await Question.findByPk(2);
  console.log(question2.question);

  // pour récupérer les reponsesPossibles je peut utiliser la methode get[nom de la relation]()
  const answers = await question2.getPossibleAnswers();
  for (const answer of answers) {
    console.log(answer.description);
  }

  */


  /*
  La solution de l'atelier n'est plus là 😊
  */

};
test();
