// ===== DONNÉES MOQUÉES (À REMPLACER PAR FIREBASE/SQL) =====
let quizData = [
  // Technologie
  {
    id: 1,
    category: "Technologie",
    difficulty: "Facile",
    question: "Quel est le langage le plus utilisé en IA en 2026 ?",
    options: ["Java", "Python", "C++", "JavaScript"],
    correctAnswer: 1,
    explanation: "Python domine grâce à ses bibliothèques comme TensorFlow et PyTorch."
  },
  {
    id: 2,
    category: "Technologie",
    difficulty: "Moyenne",
    question: "Qui a fondé Microsoft ?",
    options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk"],
    correctAnswer: 1,
    explanation: "Bill Gates a cofondé Microsoft avec Paul Allen en 1975."
  },
  {
    id: 3,
    category: "Technologie",
    difficulty: "Difficile",
    question: "Quel est le premier réseau social créé ?",
    options: ["Facebook", "Twitter", "Six Degrees", "MySpace"],
    correctAnswer: 2,
    explanation: "Six Degrees, lancé en 1997, est considéré comme le premier réseau social moderne."
  },
  // Science
  {
    id: 4,
    category: "Science",
    difficulty: "Facile",
    question: "Quelle est la formule chimique de l'eau ?",
    options: ["H2O", "CO2", "O2", "NaCl"],
    correctAnswer: 0,
    explanation: "L'eau est composée de 2 atomes d'hydrogène (H) et 1 atome d'oxygène (O)."
  },
  {
    id: 5,
    category: "Science",
    difficulty: "Moyenne",
    question: "Quelle planète est connue comme la 'planète rouge' ?",
    options: ["Vénus", "Mars", "Jupiter", "Saturne"],
    correctAnswer: 1,
    explanation: "Mars est appelée la planète rouge en raison de son apparence rouilleuse."
  },
  {
    id: 6,
    category: "Science",
    difficulty: "Difficile",
    question: "Quelle est la vitesse de la lumière (en km/s) ?",
    options: ["300 000", "150 000", "500 000", "1 000 000"],
    correctAnswer: 0,
    explanation: "La vitesse de la lumière dans le vide est d'environ 299 792 km/s, arrondie à 300 000 km/s."
  },
  // Histoire
  {
    id: 7,
    category: "Histoire",
    difficulty: "Facile",
    question: "En quelle année a eu lieu la Révolution française ?",
    options: ["1789", "1492", "1848", "1917"],
    correctAnswer: 0,
    explanation: "La Révolution française a commencé en 1789 avec la prise de la Bastille."
  },
  {
    id: 8,
    category: "Histoire",
    difficulty: "Moyenne",
    question: "Quel empereur romain a construit un mur en Angleterre ?",
    options: ["Jules César", "Auguste", "Hadrien", "Néron"],
    correctAnswer: 2,
    explanation: "Le mur d'Hadrien a été construit sous son règne pour marquer la frontière nord de l'Empire romain."
  },
  {
    id: 9,
    category: "Histoire",
    difficulty: "Difficile",
    question: "Quel traité a mis fin à la Première Guerre mondiale ?",
    options: ["Traité de Versailles", "Traité de Tordesillas", "Traité de Rome", "Traité de Paris"],
    correctAnswer: 0,
    explanation: "Le traité de Versailles, signé en 1919, a officiellement mis fin à la Première Guerre mondiale."
  },
  // Cinéma
  {
    id: 10,
    category: "Cinéma",
    difficulty: "Facile",
    question: "Quel film a remporté l'Oscar du meilleur film en 2023 ?",
    options: ["Everything Everywhere All at Once", "The Banshees of Inisherin", "Top Gun: Maverick", "Elvis"],
    correctAnswer: 0,
    explanation: "Everything Everywhere All at Once a remporté 7 Oscars en 2023."
  },
  {
    id: 11,
    category: "Cinéma",
    difficulty: "Moyenne",
    question: "Quel acteur incarne Tony Stark dans les films Marvel ?",
    options: ["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo"],
    correctAnswer: 1,
    explanation: "Robert Downey Jr. a joué Tony Stark (Iron Man) dans 10 films Marvel."
  },
  {
    id: 12,
    category: "Cinéma",
    difficulty: "Difficile",
    question: "Quel réalisateur a dirigé 'Inception' ?",
    options: ["Steven Spielberg", "Christopher Nolan", "Quentin Tarantino", "Martin Scorsese"],
    correctAnswer: 1,
    explanation: "Christopher Nolan a réalisé 'Inception' en 2010."
  }
];

// ===== VARIABLES GLOBALES =====
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 90; // 90 secondes par question
let timerInterval;
let selectedAnswer = null;
let selectedTheme = null;
let selectedDifficulty = null; // À ajouter si tu veux gérer la difficulté
let playerName = "Joueur Anonyme"; // À remplacer par un système de connexion

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

// ===== RÉCUPÉRER LE THÈME DEPUIS L'URL =====
const urlParams = new URLSearchParams(window.location.search);
const themeParam = urlParams.get('theme');
if (themeParam) {
  selectedTheme = themeParam;
  // Filtrer les questions par thème
  quizData = quizData.filter(q => q.category.toLowerCase() === themeParam.toLowerCase());
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

// ===== FONCTIONS DU QUIZ =====
function initQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswer = null;
  updateQuestion();
  updateScore();
  startTimer();
  resetFeedback();
  nextBtn.style.display = 'none';
  validateBtn.disabled = true;
}

function updateQuestion() {
  if (currentQuestionIndex >= quizData.length) {
    endQuiz();
    return;
  }

  const question = quizData[currentQuestionIndex];
  questionCategoryEl.textContent = `Thème : ${question.category} | Difficulté : ${question.difficulty}`;
  questionTextEl.textContent = question.question;
  currentQuestionEl.textContent = currentQuestionIndex + 1;
  totalQuestionsEl.textContent = quizData.length;

  // Mettre à jour les options
  optionsContainerEl.innerHTML = '';
  question.options.forEach((option, index) => {
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

function selectOption(index) {
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.classList.remove('selected', 'correct', 'wrong');
  });

  const selectedBtn = document.querySelector(`.option-btn[data-index="${index}"]`);
  selectedBtn.classList.add('selected');
  selectedAnswer = index;
  validateBtn.disabled = false;
}

function validateAnswer() {
  if (selectedAnswer === null) return;

  const question = quizData[currentQuestionIndex];
  const isCorrect = selectedAnswer === question.correctAnswer;

  if (isCorrect) {
    score += calculatePoints(question.difficulty); // Points selon la difficulté
    updateScore();
  }

  showFeedback(isCorrect);

  document.querySelectorAll('.option-btn').forEach((btn, index) => {
    if (index === question.correctAnswer) {
      btn.classList.add('correct');
    } else if (index === selectedAnswer) {
      btn.classList.add('wrong');
    }
    btn.disabled = true;
  });

  validateBtn.disabled = true;
  nextBtn.style.display = 'block';
  clearInterval(timerInterval);
}

function calculatePoints(difficulty) {
  switch (difficulty.toLowerCase()) {
    case 'facile': return 30;
    case 'moyenne': return 50;
    case 'difficile': return 100;
    default: return 50;
  }
}

function showFeedback(isCorrect) {
  feedbackEl.style.display = 'flex';
  explanationEl.style.display = 'block';
  explanationTextEl.textContent = quizData[currentQuestionIndex].explanation;

  if (isCorrect) {
    feedbackIconEl.textContent = '✅';
    feedbackTextEl.textContent = `Bonne réponse ! +${calculatePoints(quizData[currentQuestionIndex].difficulty)} pts`;
    feedbackEl.classList.add('correct-feedback');
    feedbackEl.classList.remove('wrong-feedback');
  } else {
    feedbackIconEl.textContent = '❌';
    feedbackTextEl.textContent = 'Mauvaise réponse !';
    feedbackEl.classList.add('wrong-feedback');
    feedbackEl.classList.remove('correct-feedback');
  }
}

function resetFeedback() {
  feedbackEl.style.display = 'none';
  explanationEl.style.display = 'none';
  feedbackEl.classList.remove('correct-feedback', 'wrong-feedback');
}

function resetOptionsStyle() {
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.classList.remove('selected', 'correct', 'wrong');
    btn.disabled = false;
  });
}

function updateScore() {
  scoreEl.textContent = `${score} pts`;
}

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

function updateProgressBar() {
  const progressPercentage = ((currentQuestionIndex + (90 - timeLeft) / 90) / quizData.length) * 100;
  progressFillEl.style.width = `${progressPercentage}%`;

  if (timeLeft <= 10) {
    progressFillEl.style.backgroundColor = 'var(--danger-color)';
  } else if (timeLeft <= 30) {
    progressFillEl.style.backgroundColor = 'var(--warning-color)';
  } else {
    progressFillEl.style.backgroundColor = body.classList.contains('dark') ? 'var(--accent-dark)' : 'var(--accent-light)';
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  updateQuestion();
  nextBtn.style.display = 'none';
  resetFeedback();
  startTimer();
}

function endQuiz() {
  // Sauvegarder le score dans Firebase ou MySQL
  saveScore(score, quizData.length, selectedTheme);

  // Rediriger vers la page de résultats avec le score en paramètre
  window.location.href = `results.html?score=${score}&total=${quizData.length}&theme=${selectedTheme}`;
}

// ===== SAUVEGARDE DU SCORE (FIREBASE) =====
import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

async function saveScore(score, total, theme) {
  try {
    await addDoc(collection(db, "scores"), {
      playerName: playerName,
      score: score,
      total: total,
      theme: theme,
      difficulty: selectedDifficulty,
      percentage: Math.round((score / (total * 50)) * 100), // Calcul du pourcentage
      createdAt: serverTimestamp()
    });
    console.log("Score sauvegardé dans Firebase !");
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du score :", error);
  }
}



// ===== ÉCOUTEURS D'ÉVÉNEMENTS =====
validateBtn.addEventListener('click', validateAnswer);
nextBtn.addEventListener('click', nextQuestion);
backBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});

// ===== CHARGEMENT DES QUESTIONS DEPUIS FIREBASE =====
import { db } from './firebase-config.js';
import { collection, query, where, getDocs } from "firebase/firestore";

async function loadQuestionsFromFirebase(theme) {
  try {
    const q = query(
      collection(db, "questions"),
      where("category", "==", theme)
    );
    const querySnapshot = await getDocs(q);
    quizData = [];
    querySnapshot.forEach((doc) => {
      quizData.push({ id: doc.id, ...doc.data() });
    });
    initQuiz();
  } catch (error) {
    console.error("Erreur lors du chargement des questions :", error);
    // Utiliser les données moquées en cas d'erreur
    initQuiz();
  }
}

// Si un thème est sélectionné, charger les questions depuis Firebase
if (selectedTheme) {
  loadQuestionsFromFirebase(selectedTheme);
} else {
  initQuiz();
}

// ===== DÉMARRER LE QUIZ =====
initQuiz();