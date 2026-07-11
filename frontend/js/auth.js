// frontend/js/auth.js
// ===== VARIABLES GLOBALES =====
let playerId = null;

// ===== ÉCOUTER LES CHANGEMENTS D'AUTHENTIFICATION =====
// On va simuler une authentification basique pour l'instant
// (Plus tard, on pourra ajouter Firebase Auth ou JWT)

document.addEventListener('DOMContentLoaded', () => {
  // Récupérer le pseudo et l'ID du joueur depuis localStorage
  const savedPlayerName = localStorage.getItem('playerName');
  const savedPlayerId = localStorage.getItem('playerId');

  if (savedPlayerName) {
    playerName = savedPlayerName;
    playerId = savedPlayerId;
    updateAuthUI(true);
  } else {
    updateAuthUI(false);
  }

  // Bouton de connexion/déconnexion
  const authButton = document.getElementById('authButton');
  if (authButton) {
    authButton.addEventListener('click', () => {
      if (playerId) {
        logOut();
      } else {
        showAuthModal();
      }
    });
  }
});

function updateAuthUI(isConnected) {
  const authButton = document.getElementById('authButton');
  const leaguesSection = document.getElementById('leaguesSection');

  if (!authButton) return;

  if (isConnected) {
    authButton.textContent = "Se déconnecter";
    if (leaguesSection) leaguesSection.style.display = 'block';
  } else {
    authButton.textContent = "Se connecter";
    if (leaguesSection) leaguesSection.style.display = 'none';
  }
}

// Afficher une modale de connexion/inscription
function showAuthModal() {
  const playerName = prompt("Entrez votre pseudo :");
  if (!playerName) return;

  // Vérifier si le joueur existe déjà dans le backend
  fetchOrCreatePlayer(playerName);
}

async function fetchOrCreatePlayer(playerName) {
  try {
    // Vérifier si le joueur existe
    const response = await fetch('http://localhost:3000/api/players');
    if (!response.ok) throw new Error("Erreur réseau");
    const players = await response.json();
    const existingPlayer = players.find(p => p.pseudo === playerName);

    if (existingPlayer) {
      // Joueur existe déjà
      playerId = existingPlayer.id;
      localStorage.setItem('playerName', playerName);
      localStorage.setItem('playerId', playerId);
      updateAuthUI(true);
      alert(`Bienvenue, ${playerName} !`);
    } else {
      // Créer un nouveau joueur
      const createResponse = await fetch('http://localhost:3000/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pseudo: playerName })
      });

      if (!createResponse.ok) {
        const error = await createResponse.json();
        throw new Error(error.message || "Erreur lors de la création du joueur.");
      }

      const newPlayer = await createResponse.json();
      playerId = newPlayer.id;
      localStorage.setItem('playerName', playerName);
      localStorage.setItem('playerId', playerId);
      updateAuthUI(true);
      alert(`Bienvenue, ${playerName} ! Votre compte a été créé.`);
    }
  } catch (error) {
    console.error("Erreur :", error);
    alert(error.message || "Erreur lors de la connexion.");
  }
}

// Déconnexion
function logOut() {
  localStorage.removeItem('playerName');
  localStorage.removeItem('playerId');
  playerId = null;
  playerName = "Anonyme";
  updateAuthUI(false);
  alert("Déconnexion réussie.");
}

// Exporter pour les autres modules
export { playerId, playerName };