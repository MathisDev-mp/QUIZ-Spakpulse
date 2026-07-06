// Fonction pour envoyer un message
function sendMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();

  if (message === "") return; // Ne pas envoyer de message vide

  // Ajouter le message à la liste
  const chatMsgs = document.getElementById("chatMsgs");
  const newMsg = document.createElement("div");
  newMsg.className = "msg me";
  newMsg.textContent = "Moi : " + message;
  chatMsgs.appendChild(newMsg);

  // Effacer le champ de saisie
  input.value = "";

  // Faire défiler vers le bas pour afficher le nouveau message
  chatMsgs.scrollTop = chatMsgs.scrollHeight;

  // Simuler une réponse automatique (optionnel)
  setTimeout(() => {
    const response = document.createElement("div");
    response.className = "msg other";
    response.innerHTML = `<strong>Bot :</strong> Merci pour ton message ! Je vais transmettre à la ligue.`;
    chatMsgs.appendChild(response);
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
  }, 1000);
}