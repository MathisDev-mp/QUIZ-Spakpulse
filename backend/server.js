// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const questionRoutes = require('./routes/questions');
const scoreRoutes = require('./routes/scores');
const themeRoutes = require('./routes/themes');
const leagueRoutes = require('./routes/leagues');
const playerRoutes = require('./routes/players'); 
const chatRoutes = require('./routes/chat');     

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
app.use('/api/leagues', leagueRoutes);
app.use('/api/players', playerRoutes); 
app.use('/api/chat', chatRoutes);     

// Route de test
app.get('/', (req, res) => {
  res.send('Serveur Sparpulse en cours d\'exécution !');
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur Sparpulse en cours sur http://localhost:${PORT}`);
});