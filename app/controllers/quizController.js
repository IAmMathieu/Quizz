const { Answer, Level, Tag, Quiz, User, Question } = require('../models');
const { sequelize } = require('../models/answer');

const quizController = {
    quizPage: async (req, res) => {
        const quizId = req.params.id
        const results = await Quiz.findAll({
            where: {
                id: quizId,
            },
            include: [{
                model: Question,
                as: 'questions',
                include: {
                    model: Level,
                    as: 'level'
                    }
                }, 'tags'
            ],
        })
        console.log(results);
        res.render('quiz', {results, session: req.session.rank})
    }
}

module.exports = quizController;