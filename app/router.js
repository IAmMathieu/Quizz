const express = require('express');

// importer les controllers
const mainController = require('./controllers/mainController');
const quizController = require('./controllers/quizController');
const tagController = require('./controllers/tagController');
const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');

// importer les middlewares
const adminMiddleware = require('./middlewares/admin');
const userMiddleware = require('./middlewares/user');

const router = express.Router();

// page d'accueil
router.get('/', mainController.homePage);

// page "quizz"
router.route('/quiz/:id')
      .get(quizController.quizzPage)
      .post(userMiddleware, quizController.quizzPlay)

// page "tags" ("sujets")
router.get('/tags', tagController.tagList);

// "ajout tags" via lien dans l'espace admin
router.route('/addtag')
      .get(adminMiddleware, tagController.addTagForm)
      .post(adminMiddleware, tagController.addTag);

// "edit tags" via lien dans l'espace admin
router.route('/edittag')
      .get(adminMiddleware, tagController.editTagForm)
      .post(adminMiddleware, tagController.editTag);

// "link tag with quiz" via lien dans l'espace admin
router.route('/linktagtoquiz')
      .get(adminMiddleware, tagController.linkTagToQuizForm)
      .post(adminMiddleware, tagController.linkTagToQuiz);

// quizzes par tag
router.get('/quizzes/tag/:id', quizController.listByTag);

// user signup/login
router.route('/signup')
      .get(userController.signupPage)
      .post(userController.signupAction);

router.route('/login')
      .get(userController.loginPage)
      .post(userController.loginAction);

router.get('/disconnect', userController.disconnect);

router.get('/profile', userController.profilePage);

// admin
router.get('/admin', adminMiddleware, adminController.adminPage);

module.exports = router;