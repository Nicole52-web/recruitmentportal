const express = require('express');
const router = express.Router();
const QuizController = require('../Controller/QuizController');
const { userAuthorizationHandler } = require('../Middleware/UserAuthorizationMiddleware');
const {
    authenticateUser,
} = require("./../Middleware/UserAuthenticationMiddleware");

router.post('/results', QuizController.saveQuiz, userAuthorizationHandler('User'))

module.exports= router;