const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const questionRoutes = require('./routes/questions');
const scoreRoutes = require('./routes/scores');
const themeRoutes = require('./routes/themes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/questions', questionRoutes);
app.use('/api/scores', scoreRoutes);
app.use('/api/themes', themeRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur Sparpulse en cours d'exécution sur http://localhost:${PORT}`);
});
const pool = require('../config/db');

// Récupérer toutes les questions
exports.getAllQuestions = async (req, res) => {
  try {
    const [questions] = await pool.query(`
      SELECT q.*, t.name AS theme_name
      FROM questions q
      JOIN themes t ON q.theme_id = t.id
    `);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer les questions par thème
exports.getQuestionsByTheme = async (req, res) => {
  try {
    const { themeId } = req.params;
    const [questions] = await pool.query(`
      SELECT q.*, t.name AS theme_name
      FROM questions q
      JOIN themes t ON q.theme_id = t.id
      WHERE q.theme_id = ?
    `, [themeId]);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer une question aléatoire
exports.getRandomQuestion = async (req, res) => {
  try {
    const [questions] = await pool.query(`
      SELECT q.*, t.name AS theme_name
      FROM questions q
      JOIN themes t ON q.theme_id = t.id
      ORDER BY RAND()
      LIMIT 1
    `);
    res.json(questions[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Récupérer toutes les questions (optionnel : par thème)
router.get('/', questionController.getAllQuestions);

// Récupérer les questions par thème
router.get('/theme/:themeId', questionController.getQuestionsByTheme);

// Récupérer une question aléatoire
router.get('/random', questionController.getRandomQuestion);

module.exports = router;