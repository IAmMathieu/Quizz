const { Tag, Quiz } = require('../models');

const tagController = {
  tagList: async (req, res) => {
    try {
      const tags = await Tag.findAll();
      res.render('tags', {tags});
    } catch (err) {
      console.trace(err);
      res.status(500).send(err);
    }
  },
  addTagForm: (req, res) => {
    res.render('add_tag');
  },
  addTag: async (req, res) => {
    try {
      await Tag.create({name: req.body.tag})
      res.redirect('/tags')
      
    } catch (err) {
      console.trace(err);
      res.status(500).send(err);
    }
  },
  editTagForm: async (req, res) => {
    try {
      const tags = await Tag.findAll();
      res.render('edit_tag', {tags});
    } catch (err) {
      console.trace(err);
      res.status(500).send(err);
    }
  },
  editTag: async (req, res) => {
    try {
      await Tag.update({name: req.body.newtag}, {where: { name: req.body.tag}});
      res.redirect('/tags')
    } catch (err) {
      console.trace(err);
      res.status(500).send(err);
    }
  },
  linkTagToQuizForm: async (req, res) => {
      const tags = await Tag.findAll();
      const quizzes = await Quiz.findAll();
      res.render('link_tag', {tags, quizzes});
  },
  linkTagToQuiz: async (req, res) => {
    const quiz = await Quiz.findOne({where: {title: req.body.quiz}});
    const tag = await Tag.findOne({where: {name: req.body.tag}});
    await quiz.addTag(tag);
    res.redirect('/tags')
  }
};

module.exports = tagController;