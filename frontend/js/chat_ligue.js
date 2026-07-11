// frontend/js/chat_ligue.js
// ===== ÉLÉMENTS DOM =====
const chatMsgs = document.getElementById("chatMsgs");
const chatInput = document.getElementById("chatInput");
const leagueSelect = document.getElementById("leagueSelect");
const refreshLeagueBtn = document.getElementById("refreshLeagueBtn");
const onlineMembersList = document.getElementById("onlineMembersList");

// ===== VARIABLES GLOBALES =====
let currentLeagueId = null;
let currentLeagueMembers = [];
let playerName = localStorage.getItem('playerName') || "Anonyme";
let playerId = localStorage.getItem('playerId') || null;

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', async () => {
  // Charger les ligues de l'utilisateur
  if (playerId) {
    await loadUserLeagues();
  }

  // Écouter le changement de ligue
  if (leagueSelect) {
    leagueSelect.addEventListener('change', (e) => {
      currentLeagueId = e.target.value;
      if (currentLeagueId) {
        loadMessages(currentLeagueId);
        updateOnlineMembers(currentLeagueId);
      }
    });
  }

  // Bouton de rafraîchissement
  if (refreshLeagueBtn) {
    refreshLeagueBtn.addEventListener('click', () => {
      if (currentLeagueId) {
        loadMessages(currentLeagueId);
      }
      if (playerId) {
        loadUserLeagues();
      }
    });
  }

  // Charger les messages si une ligue est sélectionnée dans l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const leagueIdFromUrl = urlParams.get('league');
  if (leagueIdFromUrl) {
    currentLeagueId = leagueIdFromUrl;
    if (leagueSelect) {
      leagueSelect.value = currentLeagueId;
      loadMessages(currentLeagueId);
      updateOnlineMembers(currentLeagueId);
    }
  }

  // Gestion du thème
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList = savedTheme;
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
      const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
      document.body.classList = newTheme;
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
});

function updateThemeIcon(theme) {
  const themeToggle = document.querySelector('.theme-toggle');
  if (!themeToggle) return;

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

// ===== CHARGEMENT DES LIGUES DE L'UTILISATEUR =====
async function loadUserLeagues() {
  if (!leagueSelect || !playerId) return;

  try {
    const response = await fetch(`http://localhost:3000/api/leagues/player/${playerId}`);
    if (!response.ok) throw new Error("Erreur réseau");
    const leagues = await response.json();
    updateLeagueSelect(leagues);
  } catch (error) {
    console.error("Erreur :", error);
  }
}

// ===== METTRE À JOUR LE SÉLECTEUR DE LIGUE =====
function updateLeagueSelect(leagues) {
  if (!leagueSelect) return;

  leagueSelect.innerHTML = '<option value="">-- Sélectionner une ligue --</option>';
  leagues.forEach(league => {
    const option = document.createElement('option');
    option.value = league.id;
    option.textContent = league.name;
    leagueSelect.appendChild(option);
  });
}

// ===== CHARGEMENT DES MESSAGES (POLLING) =====
let messagePollingInterval;

function loadMessages(leagueId) {
  if (!chatMsgs) return;

  chatMsgs.innerHTML = '<div class="msg other"><em>Chargement des messages...</em></div>';

  // Arrêter le polling précédent
  if (messagePollingInterval) {
    clearInterval(messagePollingInterval);
  }

  // Charger les messages immédiatement
  fetchMessages(leagueId);

  // Rafraîchir les messages toutes les 2 secondes
  messagePollingInterval = setInterval(() => {
    fetchMessages(leagueId);
  }, 2000);
}

async function fetchMessages(leagueId) {
  try {
    const response = await fetch(`http://localhost:3000/api/chat/${leagueId}`);
    if (!response.ok) throw new Error("Erreur réseau");
    const messages = await response.json();
    displayMessages(messages);
  } catch (error) {
    console.error("Erreur :", error);
  }
}

function displayMessages(messages) {
  if (!chatMsgs) return;

  chatMsgs.innerHTML = messages.map(msg => {
    const isMe = msg.sender === playerName;
    return `
      <div class="msg ${isMe ? 'me' : 'other'}">
        <strong>${msg.sender} :</strong> ${msg.text}
      </div>
    `;
  }).join('');

  chatMsgs.scrollTop = chatMsgs.scrollHeight;
}

// ===== ENVOYER UN MESSAGE =====
window.sendMessage = async function() {
  const message = chatInput.value.trim();
  if (!message || !currentLeagueId) return;

  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: message,
        sender: playerName,
        leagueId: currentLeagueId
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de l'envoi du message.");
    }

    chatInput.value = "";
  } catch (error) {
    console.error("Erreur :", error);
    alert(error.message || "Erreur lors de l'envoi du message.");
  }
};

// ===== GESTION DES MEMBRES EN LIGNE =====
async function updateOnlineMembers(leagueId) {
  if (!onlineMembersList) return;

  try {
    const response = await fetch(`http://localhost:3000/api/leagues/${leagueId}/members`);
    if (!response.ok) throw new Error("Erreur réseau");
    currentLeagueMembers = await response.json();
    displayOnlineMembers();
  } catch (error) {
    console.error("Erreur :", error);
  }
}

function displayOnlineMembers() {
  if (!onlineMembersList) return;

  onlineMembersList.innerHTML = currentLeagueMembers.map(member => `
    <div class="online-member">${member.pseudo || member.playerName || "Anonyme"}</div>
  `).join('');
}