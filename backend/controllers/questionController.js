// backend/controllers/questionController.js
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
    console.error("Erreur dans getAllQuestions :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des questions." });
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
    console.error("Erreur dans getQuestionsByTheme :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des questions par thème." });
  }
};

// Récupérer une question aléatoire
exports.getRandomQuestion = async (req, res) => {
  try {
    const { themeId, difficulty } = req.query;
    let query = `
      SELECT q.*, t.name AS theme_name
      FROM questions q
      JOIN themes t ON q.theme_id = t.id
    `;
    const params = [];

    if (themeId) {
      query += ` WHERE q.theme_id = ?`;
      params.push(themeId);
    }

    if (difficulty) {
      query += (themeId ? ` AND` : ` WHERE`) + ` q.difficulty = ?`;
      params.push(difficulty);
    }

    query += ` ORDER BY RAND() LIMIT 1`;

    const [questions] = await pool.query(query, params);
    res.json(questions[0] || {});
  } catch (error) {
    console.error("Erreur dans getRandomQuestion :", error);
    res.status(500).json({ error: "Erreur lors de la récupération d'une question aléatoire." });
  }
};

// Récupérer les questions par difficulté
exports.getQuestionsByDifficulty = async (req, res) => {
  try {
    const { difficulty } = req.params;
    const [questions] = await pool.query(`
      SELECT q.*, t.name AS theme_name
      FROM questions q
      JOIN themes t ON q.theme_id = t.id
      WHERE q.difficulty = ?
    `, [difficulty]);
    res.json(questions);
  } catch (error) {
    console.error("Erreur dans getQuestionsByDifficulty :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des questions par difficulté." });
  }
};