const { Quiz, Tag } = require('../models');

const quizzController = {

  quizzPage: async (req, res) => {
    try {
      const quizId = parseInt(req.params.id);
      const quiz = await Quiz.findByPk(quizId,{
        include: [
          { association: 'author'},
          { association: 'questions', include: ['answers', 'level']},
          { association: 'tags'}
        ]
      });
      if (!res.locals.user) {
        res.render('quiz', {quiz});
      } else {
        res.render('play_quiz', {quiz});
        // res.json(quiz)
      }

    } catch (err) {
      console.trace(err);
      res.status(500).send(err);
    }
  },
  quizzPlay: async (req, res) => {
    const quizId = parseInt(req.params.id);
    const goodAnswers = []
    const quiz = await Quiz.findByPk(quizId,{
      include: [
        { association: 'author'},
        { association: 'questions', include: ['answers', 'level']},
        { association: 'tags'}
      ]
    });
    quiz.questions.forEach(question => {
      question.answers.forEach(answer => {
        if (answer.id == question.answer_id) {
          goodAnswers.push(answer.id)
        }
      })
    });
    const answers = [];
    for (const [key, value] of Object.entries(req.body)) {
      answers.push(Number(value))
    }
    res.render('quiz_solution', {quiz, answers, goodAnswers});
  },
  listByTag: async (req, res) => {
    // plutot que de faire une requete compliquée
    // on va passer par le tag, et laisser les relations de Sequelize faire le taf !
    try {
      const tagId = parseInt(req.params.id);
      const tag = await Tag.findByPk(tagId,{
        include: [{
          association: 'quizzes',
          include: ['author']
        }]
      });
      const quizzes = tag.quizzes;
      res.render('index', { quizzes });
    } catch (err) {
      console.trace(err);
      res.status(500).send(err);
    }
  }

};

module.exports = quizzController;