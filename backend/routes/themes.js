// backend/routes/themes.js
const express = require('express');
const router = express.Router();
const themeController = require('../controllers/themeController');

// Récupérer tous les thèmes
router.get('/', themeController.getAllThemes);

// Récupérer un thème par ID
router.get('/:id', themeController.getThemeById);

module.exports = router;