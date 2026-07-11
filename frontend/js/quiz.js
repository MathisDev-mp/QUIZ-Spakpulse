// frontend/js/quiz.js
// ===== VARIABLES GLOBALES =====
let quizData = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 90; // 90 secondes par question
let timerInterval;
let selectedAnswer = null;
let selectedTheme = null;
let selectedDifficulty = "Moyenne"; // Difficulté par défaut
let playerName = "Anonyme";

// ===== ÉLÉMENTS DOM =====
const currentQuestionEl = document.getElementById('current-question');
const totalQuestionsEl = document.getElementById('total-questions');
const questionCategoryEl = document.getElementById('question-category');
const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');
const validateBtn = document.getElementById('validate-btn');
const nextBtn = document.getElementById('next-btn');
const timerEl = document.getElementById('timer');
const progressFillEl = document.getElementById('progress-fill');
const scoreEl = document.getElementById('score');
const feedbackEl = document.getElementById('feedback');
const feedbackIconEl = document.getElementById('feedback-icon');
const feedbackTextEl = document.getElementById('feedback-text');
const explanationEl = document.getElementById('explanation');
const explanationTextEl = document.getElementById('explanation-text');
const backBtn = document.querySelector('.back-btn');
const questionCardEl = document.getElementById('question-card');
const difficultySelectorEl = document.getElementById('difficultySelector');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Charger le thème sauvegardé
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.classList = savedTheme;
  updateThemeIcon(savedTheme);

  // Récupérer le thème depuis l'URL
  const urlParams = new URLSearchParams(window.location.search);
  selectedTheme = urlParams.get('theme');

  // Charger les thèmes disponibles
  loadThemes();

  // Écouter les boutons de difficulté
  difficultyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedDifficulty = btn.dataset.difficulty;
      difficultyButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      startQuiz();
    });
  });

  // Écouter le bouton de thème
  const themeToggle = document.querySelector('.theme-toggle');
  themeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
    document.body.classList = newTheme;
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  // Écouter les événements
  validateBtn.addEventListener('click', validateAnswer);
  nextBtn.addEventListener('click', nextQuestion);
  backBtn.addEventListener('click', () => {
    window.location.href = 'Acceuil.html';
  });

  // Charger le pseudo de l'utilisateur
  playerName = localStorage.getItem('playerName') || "Anonyme";
});

function updateThemeIcon(theme) {
  const themeToggle = document.querySelector('.theme-toggle');
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

// ===== CHARGEMENT DES THÈMES (DEPUIS LE BACKEND) =====
async function loadThemes() {
  try {
    const response = await fetch('http://localhost:3000/api/themes');
    if (!response.ok) throw new Error("Erreur réseau");
    const themes = await response.json();
    displayThemes(themes);
  } catch (error) {
    console.error("Erreur lors du chargement des thèmes :", error);
    // Utiliser des thèmes par défaut
    const defaultThemes = [
      { id: 1, name: "Technologie", icon: "💻" },
      { id: 2, name: "Science", icon: "🧪" },
      { id: 3, name: "Histoire", icon: "📜" },
      { id: 4, name: "Cinéma", icon: "🎬" }
    ];
    displayThemes(defaultThemes);
  }
}

function displayThemes(themes) {
  const themesGrid = document.getElementById('themesGrid');
  if (!themesGrid) return;

  themesGrid.innerHTML = themes.map(theme => `
    <div class="theme-card" data-theme-id="${theme.id}" data-theme="${theme.name.toLowerCase()}">
      <div class="theme-icon">${theme.icon || "🎯"}</div>
      <span class="theme-name">${theme.name}</span>
    </div>
  `).join('');

  // Ajouter les écouteurs de clic
  document.querySelectorAll('.theme-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedTheme = card.dataset.theme;
      // Rediriger vers le quiz avec le thème sélectionné
      window.location.href = `Quiz.html?theme=${selectedTheme}`;
    });
  });
}

// ===== CHARGEMENT DES QUESTIONS (DEPUIS LE BACKEND) =====
async function loadQuestions() {
  try {
    let url = 'http://localhost:3000/api/questions';
    const params = [];

    if (selectedTheme) {
      // Trouver l'ID du thème depuis son nom
      const themesResponse = await fetch('http://localhost:3000/api/themes');
      const themes = await themesResponse.json();
      const theme = themes.find(t => t.name.toLowerCase() === selectedTheme.toLowerCase());
      if (theme) params.push(`themeId=${theme.id}`);
    }

    if (selectedDifficulty) {
      params.push(`difficulty=${selectedDifficulty}`);
    }

    if (params.length > 0) {
      url += '?' + params.join('&');
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error("Erreur réseau");
    quizData = await response.json();

    // Si aucune question, utiliser des questions par défaut
    if (quizData.length === 0) {
      quizData = getDefaultQuestions();
    }

    return quizData;
  } catch (error) {
    console.error("Erreur lors du chargement des questions :", error);
    quizData = getDefaultQuestions();
    return quizData;
  }
}

// Questions par défaut (si le backend ne répond pas)
function getDefaultQuestions() {
  return [
    {
      category: "Technologie",
      difficulty: "Facile",
      question: "Quel est le langage le plus utilisé en IA en 2026 ?",
      options: ["Java", "Python", "C++", "JavaScript"],
      correctAnswer: 1,
      explanation: "Python domine grâce à ses bibliothèques comme TensorFlow et PyTorch."
    },
    {
      category: "Technologie",
      difficulty: "Moyenne",
      question: "Qui a fondé Microsoft ?",
      options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk"],
      correctAnswer: 1,
      explanation: "Bill Gates a cofondé Microsoft avec Paul Allen en 1975."
    },
    {
      category: "Science",
      difficulty: "Facile",
      question: "Quelle est la formule chimique de l'eau ?",
      options: ["H2O", "CO2", "O2", "NaCl"],
      correctAnswer: 0,
      explanation: "L'eau est composée de 2 atomes d'hydrogène (H) et 1 atome d'oxygène (O)."
    }
  ];
}

// ===== DÉMARRER LE QUIZ =====
async function startQuiz() {
  difficultySelectorEl.style.display = 'none';
  questionCardEl.style.display = 'block';

  await loadQuestions();

  if (quizData.length === 0) {
    alert("Aucune question disponible pour ce thème/difficulté.");
    window.location.href = "Acceuil.html";
    return;
  }

  currentQuestionIndex = 0;
  score = 0;
  updateQuestion();
  updateScore();
  startTimer();
  resetFeedback();
  nextBtn.style.display = 'none';
  validateBtn.disabled = true;
}

// ===== MISE À JOUR DE LA QUESTION =====
function updateQuestion() {
  if (currentQuestionIndex >= quizData.length) {
    endQuiz();
    return;
  }

  const question = quizData[currentQuestionIndex];
  questionCategoryEl.textContent = `Thème : ${question.category || question.theme_name} | Difficulté : ${question.difficulty}`;
  questionTextEl.textContent = question.question;
  currentQuestionEl.textContent = currentQuestionIndex + 1;
  totalQuestionsEl.textContent = quizData.length;

  // Mettre à jour les options
  optionsContainerEl.innerHTML = '';
  (question.options || []).forEach((option, index) => {
    const optionBtn = document.createElement('button');
    optionBtn.className = 'option-btn';
    optionBtn.dataset.index = index;
    optionBtn.innerHTML = `
      <span class="option-letter">${String.fromCharCode(65 + index)}</span>
      <span class="option-text">${option}</span>
    `;
    optionBtn.addEventListener('click', () => selectOption(index));
    optionsContainerEl.appendChild(optionBtn);
  });

  // Réinitialiser la sélection
  selectedAnswer = null;
  validateBtn.disabled = true;
  resetOptionsStyle();
  resetTimer();
}

// ===== SÉLECTION D'UNE OPTION =====
function selectOption(index) {
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.classList.remove('selected', 'correct', 'wrong');
  });

  const selectedBtn = document.querySelector(`.option-btn[data-index="${index}"]`);
  selectedBtn.classList.add('selected');
  selectedAnswer = index;
  validateBtn.disabled = false;
}

// ===== VALIDATION DE LA RÉPONSE =====
function validateAnswer() {
  if (selectedAnswer === null) return;

  const question = quizData[currentQuestionIndex];
  const isCorrect = selectedAnswer === question.correctAnswer;

  // Mettre à jour le score
  if (isCorrect) {
    score += calculatePoints(question.difficulty);
    updateScore();
  }

  // Afficher le feedback
  showFeedback(isCorrect, question);

  // Mettre à jour les styles des options
  document.querySelectorAll('.option-btn').forEach((btn, index) => {
    if (index === question.correctAnswer) {
      btn.classList.add('correct');
    } else if (index === selectedAnswer) {
      btn.classList.add('wrong');
    }
    btn.disabled = true;
  });

  // Désactiver le bouton valider
  validateBtn.disabled = true;

  // Afficher le bouton "Question suivante"
  nextBtn.style.display = 'block';

  // Arrêter le timer
  clearInterval(timerInterval);

  // Jouer un son
  const sound = document.getElementById(isCorrect ? "correctSound" : "wrongSound");
  sound.play().catch(e => console.log("Erreur audio :", e));
}

// ===== CALCUL DES POINTS =====
function calculatePoints(difficulty) {
  switch (difficulty?.toLowerCase()) {
    case 'facile': return 30;
    case 'moyenne': return 50;
    case 'difficile': return 100;
    default: return 50;
  }
}

// ===== AFFICHER LE FEEDBACK =====
function showFeedback(isCorrect, question) {
  feedbackEl.style.display = 'flex';
  explanationEl.style.display = 'block';
  explanationTextEl.textContent = question.explanation;

  if (isCorrect) {
    feedbackIconEl.textContent = '✅';
    feedbackTextEl.textContent = `Bonne réponse ! +${calculatePoints(question.difficulty)} pts`;
    feedbackEl.classList.add('correct-feedback');
    feedbackEl.classList.remove('wrong-feedback');
  } else {
    feedbackIconEl.textContent = '❌';
    feedbackTextEl.textContent = 'Mauvaise réponse !';
    feedbackEl.classList.add('wrong-feedback');
    feedbackEl.classList.remove('correct-feedback');
  }
}

// ===== RESET DU FEEDBACK =====
function resetFeedback() {
  feedbackEl.style.display = 'none';
  explanationEl.style.display = 'none';
  feedbackEl.classList.remove('correct-feedback', 'wrong-feedback');
}

// ===== RESET DES STYLES DES OPTIONS =====
function resetOptionsStyle() {
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.classList.remove('selected', 'correct', 'wrong');
    btn.disabled = false;
  });
}

// ===== MISE À JOUR DU SCORE =====
function updateScore() {
  scoreEl.textContent = `${score} pts`;
}

// ===== CHRONOMÈTRE =====
function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 90;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    updateProgressBar();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      selectedAnswer = -1; // Réponse incorrecte par défaut
      validateAnswer();
    }
  }, 1000);
}

function resetTimer() {
  timeLeft = 90;
  updateTimerDisplay();
  updateProgressBar();
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// ===== BARRE DE PROGRESSION =====
function updateProgressBar() {
  const progressPercentage = ((currentQuestionIndex + (90 - timeLeft) / 90) / quizData.length) * 100;
  progressFillEl.style.width = `${progressPercentage}%`;

  // Changer la couleur si le temps est critique
  if (timeLeft <= 10) {
    progressFillEl.style.backgroundColor = 'var(--danger-color)';
  } else if (timeLeft <= 30) {
    progressFillEl.style.backgroundColor = 'var(--warning-color)';
  } else {
    progressFillEl.style.backgroundColor = document.body.classList.contains('dark')
      ? 'var(--accent-dark)'
      : 'var(--accent-light)';
  }
}

// ===== QUESTION SUIVANTE =====
function nextQuestion() {
  currentQuestionIndex++;
  updateQuestion();
  nextBtn.style.display = 'none';
  resetFeedback();
  startTimer();
}

// ===== FIN DU QUIZ =====
function endQuiz() {
  // Sauvegarder le score dans le backend
  saveScore();

  // Rediriger vers la page de résultats
  window.location.href = `results.html?score=${score}&total=${quizData.length}&theme=${selectedTheme}&difficulty=${selectedDifficulty}`;
}

// ===== SAUVEGARDE DU SCORE (DEPUIS LE BACKEND) =====
async function saveScore() {
  try {
    // Trouver l'ID du thème
    let themeId = null;
    if (selectedTheme) {
      const themesResponse = await fetch('http://localhost:3000/api/themes');
      const themes = await themesResponse.json();
      const theme = themes.find(t => t.name.toLowerCase() === selectedTheme.toLowerCase());
      themeId = theme?.id;
    }

    const response = await fetch('http://localhost:3000/api/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        playerName: playerName,
        score: score,
        totalQuestions: quizData.length,
        themeId: themeId || 1, // 1 = ID par défaut si thème non trouvé
        difficulty: selectedDifficulty
      })
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la sauvegarde du score");
    }

    const result = await response.json();
    console.log("Score sauvegardé :", result);
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du score :", error);
    // Sauvegarder en localStorage en fallback
    localStorage.setItem('lastScore', JSON.stringify({
      score,
      total: quizData.length,
      theme: selectedTheme,
      difficulty: selectedDifficulty,
      date: new Date().toISOString()
    }));
  }
}