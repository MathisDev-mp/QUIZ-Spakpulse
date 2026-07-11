// backend/routes/players.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Créer un joueur
router.post('/', async (req, res) => {
  try {
    const { pseudo, email, password } = req.body;

    // Vérifier si le pseudo existe déjà
    const [existingPlayers] = await pool.query('SELECT id FROM players WHERE pseudo = ?', [pseudo]);
    if (existingPlayers.length > 0) {
      return res.status(400).json({ error: "Ce pseudo est déjà utilisé." });
    }

    // Créer le joueur
    const [result] = await pool.query(
      'INSERT INTO players (pseudo, email, password) VALUES (?, ?, ?)',
      [pseudo, email || null, password || null]
    );

    // Récupérer le joueur créé
    const [newPlayer] = await pool.query('SELECT * FROM players WHERE id = ?', [result.insertId]);

    res.json(newPlayer[0]);
  } catch (error) {
    console.error("Erreur dans createPlayer :", error);
    res.status(500).json({ error: "Erreur lors de la création du joueur." });
  }
});

// Récupérer tous les joueurs
router.get('/', async (req, res) => {
  try {
    const [players] = await pool.query('SELECT * FROM players');
    res.json(players);
  } catch (error) {
    console.error("Erreur dans getAllPlayers :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des joueurs." });
  }
});

// Récupérer un joueur par ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [players] = await pool.query('SELECT * FROM players WHERE id = ?', [id]);
    if (players.length === 0) {
      return res.status(404).json({ error: "Joueur non trouvé." });
    }
    res.json(players[0]);
  } catch (error) {
    console.error("Erreur dans getPlayerById :", error);
    res.status(500).json({ error: "Erreur lors de la récupération du joueur." });
  }
});

module.exports = router;