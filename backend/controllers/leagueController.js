// backend/controllers/leagueController.js
const pool = require('../config/db');

// Créer une ligue
exports.createLeague = async (req, res) => {
  try {
    const { name, description, ownerId } = req.body;

    // Vérifier que l'owner existe
    const [players] = await pool.query('SELECT id FROM players WHERE id = ?', [ownerId]);
    if (players.length === 0) {
      return res.status(400).json({ error: "Le propriétaire de la ligue n'existe pas." });
    }

    // Créer la ligue
    const [result] = await pool.query(
      'INSERT INTO leagues (name, description, owner) VALUES (?, ?, ?)',
      [name, description || '', ownerId]
    );
    const leagueId = result.insertId;

    // Ajouter le propriétaire comme membre
    await pool.query(
      'INSERT INTO league_members (league_id, player_id) VALUES (?, ?)',
      [leagueId, ownerId]
    );

    res.json({ success: true, leagueId, message: 'Ligue créée avec succès !' });
  } catch (error) {
    console.error("Erreur dans createLeague :", error);
    res.status(500).json({ error: "Erreur lors de la création de la ligue." });
  }
};

// Rejoindre une ligue
exports.joinLeague = async (req, res) => {
  try {
    const { leagueId, playerId } = req.body;

    // Vérifier que la ligue existe
    const [leagues] = await pool.query('SELECT id FROM leagues WHERE id = ?', [leagueId]);
    if (leagues.length === 0) {
      return res.status(404).json({ error: "Ligue non trouvée." });
    }

    // Vérifier que le joueur existe
    const [players] = await pool.query('SELECT id FROM players WHERE id = ?', [playerId]);
    if (players.length === 0) {
      return res.status(404).json({ error: "Joueur non trouvé." });
    }

    // Vérifier que le joueur n'est pas déjà membre
    const [members] = await pool.query(
      'SELECT id FROM league_members WHERE league_id = ? AND player_id = ?',
      [leagueId, playerId]
    );
    if (members.length > 0) {
      return res.status(400).json({ error: "Le joueur est déjà membre de cette ligue." });
    }

    // Ajouter le joueur à la ligue
    await pool.query(
      'INSERT INTO league_members (league_id, player_id) VALUES (?, ?)',
      [leagueId, playerId]
    );

    res.json({ success: true, message: 'Joueur ajouté à la ligue avec succès !' });
  } catch (error) {
    console.error("Erreur dans joinLeague :", error);
    res.status(500).json({ error: "Erreur lors de l'ajout à la ligue." });
  }
};

// Quitter une ligue
exports.leaveLeague = async (req, res) => {
  try {
    const { leagueId, playerId } = req.params;

    // Vérifier que le joueur est membre de la ligue
    const [members] = await pool.query(
      'SELECT id FROM league_members WHERE league_id = ? AND player_id = ?',
      [leagueId, playerId]
    );
    if (members.length === 0) {
      return res.status(404).json({ error: "Le joueur n'est pas membre de cette ligue." });
    }

    // Supprimer le membre de la ligue
    await pool.query(
      'DELETE FROM league_members WHERE league_id = ? AND player_id = ?',
      [leagueId, playerId]
    );

    res.json({ success: true, message: 'Joueur retiré de la ligue avec succès !' });
  } catch (error) {
    console.error("Erreur dans leaveLeague :", error);
    res.status(500).json({ error: "Erreur lors du retrait de la ligue." });
  }
};

// Récupérer les ligues d'un joueur
exports.getLeaguesByPlayer = async (req, res) => {
  try {
    const { playerId } = req.params;
    const [leagues] = await pool.query(`
      SELECT l.*
      FROM leagues l
      JOIN league_members lm ON l.id = lm.league_id
      WHERE lm.player_id = ?
    `, [playerId]);
    res.json(leagues);
  } catch (error) {
    console.error("Erreur dans getLeaguesByPlayer :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des ligues du joueur." });
  }
};

// Récupérer les membres d'une ligue
exports.getLeagueMembers = async (req, res) => {
  try {
    const { leagueId } = req.params;
    const [members] = await pool.query(`
      SELECT p.*
      FROM players p
      JOIN league_members lm ON p.id = lm.player_id
      WHERE lm.league_id = ?
    `, [leagueId]);
    res.json(members);
  } catch (error) {
    console.error("Erreur dans getLeagueMembers :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des membres de la ligue." });
  }
};