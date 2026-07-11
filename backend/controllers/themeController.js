// backend/controllers/themeController.js
const pool = require('../config/db');

// Récupérer tous les thèmes
exports.getAllThemes = async (req, res) => {
  try {
    const [themes] = await pool.query('SELECT * FROM themes');
    res.json(themes);
  } catch (error) {
    console.error("Erreur dans getAllThemes :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des thèmes." });
  }
};

// Récupérer un thème par ID
exports.getThemeById = async (req, res) => {
  try {
    const { id } = req.params;
    const [themes] = await pool.query('SELECT * FROM themes WHERE id = ?', [id]);
    if (themes.length === 0) {
      return res.status(404).json({ error: "Thème non trouvé." });
    }
    res.json(themes[0]);
  } catch (error) {
    console.error("Erreur dans getThemeById :", error);
    res.status(500).json({ error: "Erreur lors de la récupération du thème." });
  }
};