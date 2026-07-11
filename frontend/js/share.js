/**
 * Partage le score de l'utilisateur sur les réseaux sociaux.
 * @param {number} score - Score obtenu
 * @param {number} total - Nombre total de questions
 * @param {string} theme - Thème du quiz
 * @param {string} difficulty - Difficulté du quiz
 */
export function shareScore(score, total, theme = "Tous", difficulty = "Moyenne") {
  // Calculer le pourcentage
  const pointsPerQuestion = difficulty === "Facile" ? 30 : difficulty === "Moyenne" ? 50 : 100;
  const maxScore = total * pointsPerQuestion;
  const percentage = Math.round((score / maxScore) * 100);

  // Texte à partager
  const text = `J'ai marqué ${percentage}% au quiz Sparpulse (${theme} - ${difficulty}) ! 🎮 Et toi ?`;
  const url = window.location.origin + window.location.pathname.replace('results.html', 'Acceuil.html');

  // Utiliser l'API Web Share si disponible
  if (navigator.share) {
    navigator.share({
      title: "Mon score Sparpulse",
      text: text,
      url: url
    }).catch(err => {
      console.error("Erreur de partage :", err);
      // Fallback vers Twitter
      fallbackShare(text, url);
    });
  } else {
    // Fallback pour les navigateurs qui ne supportent pas Web Share
    fallbackShare(text, url);
  }
}

/**
 * Méthode de partage alternative (Twitter, Facebook, etc.)
 */
function fallbackShare(text, url) {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);

  // Ouvrir une nouvelle fenêtre avec Twitter
  window.open(
    `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    '_blank',
    'width=600,height=400'
  );
}

/**
 * Partage sur Facebook
 */
export function shareOnFacebook(score, total, theme, difficulty) {
  const percentage = Math.round((score / (total * 50)) * 100);
  const text = `J'ai marqué ${percentage}% au quiz Sparpulse !`;
  const url = window.location.href;
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
    '_blank'
  );
}

/**
 * Partage par email
 */
export function shareByEmail(score, total, theme, difficulty) {
  const percentage = Math.round((score / (total * 50)) * 100);
  const subject = `Mon score au quiz Sparpulse : ${percentage}%`;
  const body = `Salut !\n\nJe viens de faire un quiz sur Sparpulse et j'ai marqué ${percentage}% !\n\nThème : ${theme}\nDifficulté : ${difficulty}\n\nEssaie de battre mon score : ${window.location.origin}\n\nÀ bientôt !`;
  window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
}