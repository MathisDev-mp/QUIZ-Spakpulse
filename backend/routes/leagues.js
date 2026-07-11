// backend/routes/leagues.js
const express = require('express');
const router = express.Router();
const leagueController = require('../controllers/leagueController');

// Créer une ligue
router.post('/', leagueController.createLeague);

// Rejoindre une ligue
router.post('/join', leagueController.joinLeague);

// Quitter une ligue
router.delete('/:leagueId/leave/:playerId', leagueController.leaveLeague);

// Récupérer les ligues d'un joueur
router.get('/player/:playerId', leagueController.getLeaguesByPlayer);

// Récupérer les membres d'une ligue
router.get('/:leagueId/members', leagueController.getLeagueMembers);

module.exports = router;