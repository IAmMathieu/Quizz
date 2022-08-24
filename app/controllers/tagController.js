const { raw } = require('express');
const { Answer, Level, Tag, Quiz, User, Question } = require('../models');
const { sequelize } = require('../models/answer');

const tagController = {

    tagPage: async (req, res) => {
        const results = await Tag.findAll();
        res.render('tag', { results, session: req.session.rank })
    },
    quizByTagPage: async (req, res) => {
        const tag = Number(req.params.id);
        const quizs = []
        const results = await Tag.findAll({
            include: ['quizzes']
            });
        for (const result of results) {
            if (result.id === tag) {
                for (const quiz of result.quizzes) {
                    quizs.push(quiz)
                };          
            }
        }
        res.render('quizbytag', {quizs, session: req.session.rank})
    }
}

module.exports = tagController