// backend/controllers/scoreController.js
const pool = require('../config/db');

// Sauvegarder un score
exports.saveScore = async (req, res) => {
  try {
    const { playerName, score, totalQuestions, themeId, difficulty } = req.body;
    const percentage = Math.round((score / (totalQuestions * 50)) * 100); // 50 = points max par question

    // Vérifier si le joueur existe, sinon le créer
    let playerId;
    const [players] = await pool.query('SELECT id FROM players WHERE pseudo = ?', [playerName]);

    if (players.length > 0) {
      playerId = players[0].id;
    } else {
      const [newPlayer] = await pool.query(
        'INSERT INTO players (pseudo) VALUES (?)',
        [playerName]
      );
      playerId = newPlayer.insertId;
    }

    // Sauvegarder le score
    await pool.query(
      'INSERT INTO scores (player_id, score, total_questions, theme_id, difficulty, percentage) VALUES (?, ?, ?, ?, ?, ?)',
      [playerId, score, totalQuestions, themeId, difficulty, percentage]
    );

    // Mettre à jour le total des points du joueur
    await pool.query(
      'UPDATE players SET total_points = total_points + ? WHERE id = ?',
      [score, playerId]
    );

    res.json({ success: true, message: 'Score sauvegardé avec succès !' });
  } catch (error) {
    console.error("Erreur dans saveScore :", error);
    res.status(500).json({ error: "Erreur lors de la sauvegarde du score." });
  }
};

// Récupérer le top 3 des scores
exports.getTopScores = async (req, res) => {
  try {
    const [scores] = await pool.query(`
      SELECT p.pseudo, s.score, s.total_questions, s.percentage, t.name AS theme, s.difficulty
      FROM scores s
      JOIN players p ON s.player_id = p.id
      JOIN themes t ON s.theme_id = t.id
      ORDER BY s.percentage DESC, s.score DESC
      LIMIT 3
    `);
    res.json(scores);
  } catch (error) {
    console.error("Erreur dans getTopScores :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des meilleurs scores." });
  }
};

// Récupérer les scores par joueur
exports.getScoresByPlayer = async (req, res) => {
  try {
    const { playerId } = req.params;
    const [scores] = await pool.query(`
      SELECT s.*, t.name AS theme
      FROM scores s
      JOIN themes t ON s.theme_id = t.id
      WHERE s.player_id = ?
      ORDER BY s.created_at DESC
    `, [playerId]);
    res.json(scores);
  } catch (error) {
    console.error("Erreur dans getScoresByPlayer :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des scores du joueur." });
  }
};

// Récupérer les scores par thème
exports.getScoresByTheme = async (req, res) => {
  try {
    const { themeId } = req.params;
    const [scores] = await pool.query(`
      SELECT p.pseudo, s.score, s.total_questions, s.percentage, s.difficulty
      FROM scores s
      JOIN players p ON s.player_id = p.id
      WHERE s.theme_id = ?
      ORDER BY s.percentage DESC
      LIMIT 10
    `, [themeId]);
    res.json(scores);
  } catch (error) {
    console.error("Erreur dans getScoresByTheme :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des scores par thème." });
  }
};