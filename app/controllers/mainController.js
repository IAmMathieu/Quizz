const res = require('express/lib/response');
const { Answer, Level, Tag, Quiz, User, Question } = require('../models');
const { sequelize } = require('../models/answer');

const mainController = {

    homePage: async (req, res) => {
        const results = await Quiz.findAll({include: ['author']});
        res.render('home', { results, session: req.session.rank })
    },
    subscribeForm: async (req, res) => {
        res.render('subscribe', { session: req.session.rank });
    },
    subscribePage: async (req, res) => {
        const { firstname, lastname, email, password } = req.body;
        const user = await User.build({firstname, lastname, email, password});
        await user.save();

        // await User.create({ firstname, lastname, email, password })
        res.redirect('/');

    },   
    loginForm: async (req, res) => {
        res.render('login', {session: req.session.rank});
    },
    loginPage: async (req, res) => {
        const user = await User.findAll({
            where: {
                password: req.body.password,
                email: req.body.email
            }
        })

        console.log(user);

        if ((user[0].email === req.body.email) && (user[0].password === req.body.password)) {
           req.session.rank = 'user'
        }
        res.redirect('/');
    },
    disconnect: async (req, res) => {
        req.session.rank = "";
        res.redirect('/');
    }



}

module.exports = mainController;

