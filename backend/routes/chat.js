// backend/routes/chat.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Sauvegarder un message
router.post('/', async (req, res) => {
  try {
    const { text, sender, leagueId } = req.body;

    // Vérifier que la ligue existe
    const [leagues] = await pool.query('SELECT id FROM leagues WHERE id = ?', [leagueId]);
    if (leagues.length === 0) {
      return res.status(404).json({ error: "Ligue non trouvée." });
    }

    // Sauvegarder le message
    await pool.query(
      'INSERT INTO chat_messages (text, sender, league_id) VALUES (?, ?, ?)',
      [text, sender, leagueId]
    );

    res.json({ success: true, message: "Message sauvegardé avec succès !" });
  } catch (error) {
    console.error("Erreur dans saveMessage :", error);
    res.status(500).json({ error: "Erreur lors de la sauvegarde du message." });
  }
});

// Récupérer les messages d'une ligue
router.get('/:leagueId', async (req, res) => {
  try {
    const { leagueId } = req.params;

    // Vérifier que la ligue existe
    const [leagues] = await pool.query('SELECT id FROM leagues WHERE id = ?', [leagueId]);
    if (leagues.length === 0) {
      return res.status(404).json({ error: "Ligue non trouvée." });
    }

    const [messages] = await pool.query(`
      SELECT * FROM chat_messages
      WHERE league_id = ?
      ORDER BY created_at ASC
    `, [leagueId]);

    res.json(messages);
  } catch (error) {
    console.error("Erreur dans getMessagesByLeague :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des messages." });
  }
});

module.exports = router;