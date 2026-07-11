import { db, auth } from './firebase-config.js';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ===== ÉLÉMENTS DOM =====
const createLeagueBtn = document.getElementById('createLeagueBtn');
const leaguesGrid = document.getElementById('leaguesGrid');

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
  if (createLeagueBtn) {
    createLeagueBtn.addEventListener('click', createLeague);
  }
  loadUserLeagues();
});

// ===== CRÉER UNE LIGUE =====
async function createLeague() {
  const user = auth.currentUser;
  if (!user) {
    alert("Vous devez être connecté pour créer une ligue.");
    return;
  }

  const leagueName = prompt("Nom de la ligue :");
  if (!leagueName) return;

  try {
    const userEmail = user.email;
    await addDoc(collection(db, "leagues"), {
      name: leagueName,
      owner: userEmail,
      members: [userEmail],
      createdAt: new Date()
    });
    alert(`Ligue "${leagueName}" créée avec succès !`);
    loadUserLeagues();
  } catch (error) {
    console.error("Erreur lors de la création de la ligue :", error);
    alert("Erreur lors de la création de la ligue.");
  }
}

// ===== CHARGEMENT DES LIGUES DE L'UTILISATEUR =====
async function loadUserLeagues() {
  if (!leaguesGrid) return;

  try {
    const user = auth.currentUser;
    if (!user) {
      leaguesGrid.innerHTML = '<p>Connectez-vous pour voir vos ligues.</p>';
      return;
    }

    const userEmail = user.email;
    const leaguesQuery = query(
      collection(db, "leagues"),
      where("members", "array-contains", userEmail)
    );

    const snapshot = await getDocs(leaguesQuery);
    const leagues = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    displayLeagues(leagues);
  } catch (error) {
    console.error("Erreur lors du chargement des ligues :", error);
    leaguesGrid.innerHTML = '<p>Erreur lors du chargement des ligues.</p>';
  }
}

// ===== AFFICHER LES LIGUES =====
function displayLeagues(leagues) {
  leaguesGrid.innerHTML = '';
  if (leagues.length === 0) {
    leaguesGrid.innerHTML = '<p>Aucune ligue. Créez-en une !</p>';
    return;
  }

  leagues.forEach(league => {
    const leagueCard = document.createElement('div');
    leagueCard.className = 'league-card';
    leagueCard.innerHTML = `
      <div class="league-icon">👥</div>
      <span class="league-name">${league.name}</span>
      <small>Membres: ${league.members.length}</small>
    `;

    // Ajouter un clic pour rejoindre le chat de la ligue
    leagueCard.addEventListener('click', () => {
      localStorage.setItem('currentLeague', league.id);
      window.location.href = `chat.html?league=${league.id}`;
    });

    leaguesGrid.appendChild(leagueCard);
  });
}

// ===== REJOINDRE UNE LIGUE PAR ID =====
export async function joinLeagueById(leagueId) {
  try {
    const user = auth.currentUser;
    if (!user) {
      alert("Vous devez être connecté pour rejoindre une ligue.");
      return false;
    }

    const userEmail = user.email;
    const leagueRef = doc(db, "leagues", leagueId);
    await updateDoc(leagueRef, {
      members: arrayUnion(userEmail)
    });

    return true;
  } catch (error) {
    console.error("Erreur :", error);
    return false;
  }
}

// ===== QUITTER UNE LIGUE =====
export async function leaveLeague(leagueId) {
  try {
    const user = auth.currentUser;
    if (!user) return false;

    const userEmail = user.email;
    const leagueRef = doc(db, "leagues", leagueId);
    await updateDoc(leagueRef, {
      members: arrayRemove(userEmail)
    });

    return true;
  } catch (error) {
    console.error("Erreur :", error);
    return false;
  }
}

// ===== EXPORT =====
export { loadUserLeagues, createLeague };