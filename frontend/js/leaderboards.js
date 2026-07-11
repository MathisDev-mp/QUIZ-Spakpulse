import { db } from './firebase-config.js';
import { collection, query, orderBy, limit, getDocs, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ===== CHARGEMENT DES MEILLEURS SCORES =====
async function loadTopScores(limit = 3) {
  try {
    const scoresQuery = query(
      collection(db, "scores"),
      orderBy("percentage", "desc"),
      limit(limit)
    );

    const snapshot = await getDocs(scoresQuery);
    const scores = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    displayTopScores(scores);
  } catch (error) {
    console.error("Erreur lors du chargement des scores :", error);
    // Afficher des scores par défaut
    const defaultScores = [
      { playerName: "Joueur1", percentage: 95, theme: "Technologie" },
      { playerName: "Joueur2", percentage: 88, theme: "Science" },
      { playerName: "Joueur3", percentage: 82, theme: "Histoire" }
    ];
    displayTopScores(defaultScores);
  }
}

// ===== AFFICHER LES MEILLEURS SCORES =====
function displayTopScores(scores) {
  const topScoresEl = document.getElementById('topScores');
  if (!topScoresEl) return;

  topScoresEl.innerHTML = scores.map((score, index) => `
    <div class="score-item">
      <span class="rank">${index + 1}</span>
      <span class="player-name">${score.playerName || "Anonyme"}</span>
      <span class="player-score">${score.percentage || 0}%</span>
    </div>
  `).join('');
}

// ===== CHARGEMENT DES SCORES PAR LIGUE =====
async function loadLeagueScores(leagueId, limit = 10) {
  try {
    const scoresQuery = query(
      collection(db, "scores"),
      where("leagueId", "==", leagueId),
      orderBy("percentage", "desc"),
      limit(limit)
    );

    const snapshot = await getDocs(scoresQuery);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Erreur :", error);
    return [];
  }
}

// ===== CHARGEMENT DES SCORES DE L'UTILISATEUR =====
async function loadUserScores(userEmail) {
  try {
    const scoresQuery = query(
      collection(db, "scores"),
      where("playerName", "==", userEmail.split('@')[0]),
      orderBy("timestamp", "desc")
    );

    const snapshot = await getDocs(scoresQuery);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Erreur :", error);
    return [];
  }
}

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
  loadTopScores();
});

// ===== EXPORT =====
export { loadTopScores, loadLeagueScores, loadUserScores };