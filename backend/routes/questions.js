// backend/routes/questions.js
const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Récupérer toutes les questions
router.get('/', questionController.getAllQuestions);

// Récupérer les questions par thème
router.get('/theme/:themeId', questionController.getQuestionsByTheme);

// Récupérer une question aléatoire
router.get('/random', questionController.getRandomQuestion);

// Récupérer les questions par difficulté
router.get('/difficulty/:difficulty', questionController.getQuestionsByDifficulty);

module.exports = router;