const express = require('express');
const mainController = require('./controllers/mainController');
const quizController = require('./controllers/quizController');
const tagController = require('./controllers/tagController');


const router = express.Router();

router.get('/', mainController.homePage);

router.get('/login', mainController.loginForm);
router.post('/login', mainController.loginPage);

router.get('/disconnect', mainController.disconnect);

router.get('/subscribe', mainController.subscribeForm);
router.post('/subscribe', mainController.subscribePage);


router.get('/quiz/:id', quizController.quizPage)

router.get('/tags', tagController.tagPage)
router.get('/tags/:id', tagController.quizByTagPage)



module.exports = router;