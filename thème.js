const pool = require('../config');

exports.getAllThemes = async (req, res) => {
  try {
    const [themes] = await pool.query('SELECT * FROM themes');
    res.json(themes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};