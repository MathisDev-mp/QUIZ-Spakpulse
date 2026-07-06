// ===== DONNÉES MOQUÉES (À REMPLACER PAR FIREBASE/SQL PLUS TARD) =====
let bestScores = [
  { name: "Joueur1", score: 95, theme: "Technologie", difficulty: "Difficile" },
  { name: "Joueur2", score: 88, theme: "Science", difficulty: "Moyenne" },
  { name: "Joueur3", score: 82, theme: "Histoire", difficulty: "Facile" }
];

let themes = [
  { id: "science", name: "Science", icon: "🧪" },
  { id: "history", name: "Histoire", icon: "📜" },
  { id: "cinema", name: "Cinéma", icon: "🎬" },
  { id: "tech", name: "Technologie", icon: "💻" }
];

// ===== FONCTIONS POUR AFFICHER LES DONNÉES =====
function displayBestScores() {
  const scoresList = document.querySelector('.scores-list');
  scoresList.innerHTML = '';

  // Trier par score (descendant) et prendre le top 3
  const topScores = [...bestScores]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  topScores.forEach((score, index) => {
    const scoreItem = document.createElement('div');
    scoreItem.className = 'score-item';
    scoreItem.innerHTML = `
      <span class="rank">${index + 1}</span>
      <span class="player-name">${score.name}</span>
      <span class="player-score">${score.score}%</span>
    `;
    scoresList.appendChild(scoreItem);
  });
}

function displayThemes() {
  const themesGrid = document.querySelector('.themes-grid');
  themesGrid.innerHTML = '';

  themes.forEach(theme => {
    const themeCard = document.createElement('div');
    themeCard.className = 'theme-card';
    themeCard.dataset.theme = theme.id;
    themeCard.innerHTML = `
      <div class="theme-icon">${theme.icon}</div>
      <span class="theme-name">${theme.name}</span>
    `;
    themeCard.addEventListener('click', () => selectTheme(theme.id));
    themesGrid.appendChild(themeCard);
  });
}

function selectTheme(themeId) {
  // Sauvegarder le thème sélectionné dans localStorage
  localStorage.setItem('selectedTheme', themeId);

  // Rediriger vers quiz.html avec le thème en paramètre
  window.location.href = `quiz.html?theme=${themeId}`;
}

// ===== GESTION DU THÈME (JOUR/NUIT) =====
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Charger le thème sauvegardé
const savedTheme = localStorage.getItem('theme') || 'light';
body.classList = savedTheme;
updateThemeIcon(savedTheme);

// Écouter le clic sur le toggle
themeToggle.addEventListener('click', () => {
  const newTheme = body.classList.contains('light') ? 'dark' : 'light';
  body.classList = newTheme;
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  const sunIcon = themeToggle.querySelector('.sun');
  const moonIcon = themeToggle.querySelector('.moon');
  if (theme === 'dark') {
    sunIcon.style.display = 'inline';
    moonIcon.style.display = 'none';
  } else {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'inline';
  }
}

// ===== RÉCUPÉRER LES DONNÉES DEPUIS FIREBASE (Option 1) =====


import { db } from './firebase-config.js';
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";

// Récupérer les meilleurs scores en temps réel
const scoresQuery = query(
  collection(db, "scores"),
  orderBy("score", "desc"),
  limit(3)
);

onSnapshot(scoresQuery, (snapshot) => {
  bestScores = [];
  snapshot.forEach(doc => {
    bestScores.push({ id: doc.id, ...doc.data() });
  });
  displayBestScores();
});

// Récupérer les thèmes depuis Firebase
const themesQuery = query(collection(db, "themes"));
onSnapshot(themesQuery, (snapshot) => {
  themes = [];
  snapshot.forEach(doc => {
    themes.push({ id: doc.id, ...doc.data() });
  });
  displayThemes();
});


// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
  displayBestScores();
  displayThemes();
});
