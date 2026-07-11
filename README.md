# QUIZ-Spakpulse
# ⚡ SparkPulse

# 🧠 **Sparkpulse**
**Quiz interactif en ligne avec chat de ligue et classement en temps réel**

![Sparkpulse Logo](frontend/assets/logo.png)

> **Sparpulse** est une application web de quiz interactif inspirée des jeux télévisés comme *"Qui veut gagner des millions ?"*.
> Elle permet aux utilisateurs de jouer à des quiz sur différents thèmes, de créer des ligues, de discuter en temps réel, et de suivre leurs performances via un classement global.

---

---

## 📌 **À propos du projet**

### **🎯 Objectif**
Sparpulse a été conçu pour offrir une **expérience de quiz interactive et sociale**, avec :
- Un système de **questions dynamiques** (thèmes, difficultés).
- Un **chat en temps réel** pour interagir avec les membres de sa ligue.
- Un **classement global** pour suivre ses performances.
- Une **interface moderne et responsive** (mobile, tablette, desktop).

---

## 🌟 **Fonctionnalités**

### **✅ Fonctionnalités principales**
   **Catégorie**       | **Description**                                                                                     |
 |--------------------|-----------------------------------------------------------------------------------------------------|
 | **Quiz interactif** | Questions aléatoires, timer par question (90s), feedback visuel et sonore (✅/❌), explications. |
 | **Thèmes variés**   | Technologie, Science, Histoire, Cinéma (extensible via la base de données).                     |
 | **Difficultés**     | 3 niveaux : Facile (30 pts), Moyenne (50 pts), Difficile (100 pts).                                |
 | **Classement**      | Top 3 des scores globaux, scores par thème, historique des parties.                              |
 | **Ligues**          | Création de ligues privées, invitation de membres, chat dédié.                                   |
 | **Authentification** | Connexion via pseudo (pas de mot de passe pour l'instant).                                        |
 | **Thème jour/nuit** | Basculer entre un mode clair et sombre, sauvegardé dans le `localStorage`.                       |
 | **Partage de scores** | Partager ses résultats sur Twitter ou par email.                                                 |

---

## 🛠️ **Technologies utilisées**
 | **Partie**          | **Technologies**                                                                 |
 |---------------------|---------------------------------------------------------------------------------|
 | **Frontend**        | HTML5, CSS3, JavaScript (ES6 Modules), Fetch API                              |
 | **Backend**         | Node.js, Express.js, MySQL (via `mysql2`)                                       |
 | **Base de données** | MySQL (schéma dans `DATA/data.sql`)                                             |
 | **Outils**          | Nodemon (développement), CORS (requêtes cross-origin), Git                        |
 | **Déploiement**     | Backend : Render/Heroku, Frontend : Firebase Hosting/Netlify                    |

---

## 📥 **Prérequis**

Pour exécuter ce projet localement, tu auras besoin de :
- [Node.js](https://nodejs.org/) (v16 ou supérieur) → **Pour le backend**.
- [MySQL](https://www.mysql.com/) ou [XAMPP](https://www.apachefriends.org/) → **Pour la base de données**.
- Un éditeur de code (ex: [VS Code](https://code.visualstudio.com/)).
- Un navigateur moderne (Chrome, Firefox, Edge).

---

## 🚀 **Installation**

---

### **📥 1. Récupérer le projet**
#### **Option 1 : Cloner le dépôt (si tu utilises Git)**

git clone https://github.com/ton-username/Quiz.git

Option 2 : Télécharger manuellement

Télécharge le dossier Quiz depuis ton espace de stockage.
Décompresse-le dans le dossier de ton choix.

🗃️ 2. Structure du projet
text
Copy

Quiz/
├── frontend/               # Interface utilisateur (HTML/CSS/JS)
│   ├── pages/
│   │   ├── Accueil.html    # Page d'accueil
│   │   ├── Quiz.html       # Page du quiz
│   │   ├── chat.html       # Chat de la ligue
│   │   └── results.html    # Résultats du quiz
│   │
│   ├── js/
│   │   ├── auth.js         # Gestion de l'authentification
│   │   ├── quiz.js         # Logique du quiz
│   │   ├── chat_ligue.js   # Gestion du chat
│   │   ├── leagues.js      # Gestion des ligues
│   │   ├── leaderboard.js  # Classement
│   │   └── share.js        # Partage des scores
│   │
│   ├── css/
│   │   ├── lo.css          # Styles globaux
│   │   ├── Quiz-style.css  # Styles du quiz
│   │   └── ch.css          # Styles du chat
│   │
│   └── assets/
│       ├── logo.png        # Logo de l'application
│       └── sounds/         # Sons pour le feedback
│           ├── correct.mp3
│           └── wrong.mp3
│
├── backend/                # Serveur Node.js
│   ├── config/
│   │   └── db.js           # Configuration MySQL
│   ├── controllers/
│   │   ├── questionController.js  # Logique des questions
│   │   ├── scoreController.js     # Logique des scores
│   │   ├── themeController.js     # Logique des thèmes
│   │   └── leagueController.js    # Logique des ligues
│   │
│   ├── routes/
│   │   ├── questions.js    # Routes pour les questions
│   │   ├── scores.js       # Routes pour les scores
│   │   ├── themes.js       # Routes pour les thèmes
│   │   ├── leagues.js      # Routes pour les ligues
│   │   ├── players.js      # Routes pour les joueurs
│   │   └── chat.js         # Routes pour le chat
│   │
│   └── server.js           # Point d'entrée du serveur
│
├── DATA/                   # Base de données
│   └── data.sql            # Schéma SQL (MySQL)
│
├── .env                    # Variables d'environnement (à ne pas commiter !)
├── .gitignore              # Fichiers à ignorer pour Git
└── package.json            # Dépendances Node.js




🔧 3. Configurer la base de données MySQL
3.1. Importer le schéma SQL


Lance MySQL (via XAMPP/WAMP ou en ligne de commande).


Exécute ces commandes pour créer la base et importer le schéma :
bash
Copy

mysql -u root -p



(Si tu utilises XAMPP, lance le serveur MySQL via le panneau de contrôle.)


Dans MySQL, exécute :
sql
Copy

CREATE DATABASE IF NOT EXISTS sparpulse;
USE sparpulse;
SOURCE DATA/data.sql;
QUIT;




⚠️ Si le fichier data.sql n'est pas dans le bon chemin, utilise le chemin absolu :
sql
Copy

SOURCE C:/Chemin/Vers/Quiz/DATA/data.sql;






Vérifie que les tables sont bien créées :
bash
Copy

mysql -u root -p -e "USE sparpulse; SHOW TABLES;"



→ Tu dois voir :
chat_messages, leagues, league_members, players, questions, scores, themes.


⚙️ 4. Configurer le backend
4.1. Installer les dépendances
Dans le dossier Quiz, exécute :
bash
Copy

npm install



(Cela installe toutes les dépendances nécessaires : express, cors, mysql2, dotenv, nodemon.)
4.2. Configurer .env
Crée ou édite le fichier .env à la racine du projet (Quiz/.env) :
env
Copy

# Configuration MySQL
DB_HOST=localhost
DB_USER=root          # Remplace par ton utilisateur MySQL
DB_PASSWORD=         # Remplace par ton mot de passe MySQL (laisser vide si aucun)
DB_NAME=sparpulse

# Port du serveur Node.js
PORT=3000




⚠️ Important :

Ne jamais commiter ce fichier dans Git (il est déjà dans .gitignore).
Si tu utilises XAMPP, DB_HOST peut être 127.0.0.1 et DB_USER est souvent root avec un DB_PASSWORD vide.

4.3. Lancer le backend
bash
Copy

npm run dev



→ Le serveur démarre sur http://localhost:3000 et se recharge automatiquement à chaque modification.

Vérifie que le backend fonctionne :
Ouvre ton navigateur et va sur http://localhost:3000.
Tu dois voir : "Serveur Sparpulse en cours d'exécution !".


🎨 5. Configurer le frontend
5.1. Ajouter les sons (optionnel)
Si tu veux des sons pour le feedback (✅/❌) :

Télécharge des sons libres de droits (ex: Zapsplat) :

correct.mp3 (son de réussite)
wrong.mp3 (son d'erreur)

Place-les dans frontend/assets/sounds/.
5.2. Lancer le frontend


Option 1 : Avec Live Server (recommandé pour le développement)

Installe l'extension Live Server dans VS Code.
Ouvre le dossier Quiz dans VS Code.
Fais un clic droit sur frontend/pages/Accueil.html → Open with Live Server.
Le frontend s'ouvre sur http://localhost:5500/Quiz/frontend/pages/Accueil.html.


Option 2 : Directement dans le navigateur

Ouvre frontend/pages/Accueil.html dans ton navigateur.
(Certaines fonctionnalités peuvent ne pas marcher à cause du CORS.)


🌐 Utilisation

📖 1. Page d'accueil (Accueil.html)
Fonctionnalités disponibles :

Boutons principaux :

"Jouer maintenant" → Redirige vers le quiz.
"Accéder à la ligue" → Redirige vers le chat.

Classement : Affiche le top 3 des scores globaux.
Thèmes disponibles : Liste des thèmes (Technologie, Science, Histoire, Cinéma).
Mes ligues : Affiche les ligues du joueur connecté (si connecté).
Toggle thème : Bascule entre le mode jour et nuit.
Comment utiliser :

Clique sur un thème pour commencer un quiz sur ce thème.
Clique sur "Créer une ligue" pour créer une nouvelle ligue.
Clique sur "Se connecter" pour enregistrer ton pseudo.

🎮 2. Quiz (Quiz.html)
Fonctionnalités disponibles :

Sélection de difficulté : Facile (🟢), Moyenne (🟡), Difficile (🔴).
Questions dynamiques : Chargées depuis la base de données MySQL.
Timer : 90 secondes par question.
Feedback : ✅ (bonne réponse) ou ❌ (mauvaise réponse) + explication.
Score : Points calculés selon la difficulté (30/50/100 pts par bonne réponse).
Fin du quiz : Redirige vers results.html avec le score final.
Comment utiliser :

Choisis une difficulté.
Réponds aux questions en cliquant sur une option.
Valide ta réponse avec le bouton "Valider la réponse".
Passe à la question suivante avec le bouton "Question suivante".
À la fin, ton score est sauvegardé et tu es redirigé vers la page des résultats.

💬 3. Chat de la ligue (chat.html)
Fonctionnalités disponibles :

Sélection d'une ligue : Via un menu déroulant.
Messagerie en temps réel : Rafraîchissement automatique toutes les 2 secondes.
Liste des membres en ligne : Affiche les membres de la ligue sélectionnée.
Thème jour/nuit : Synchronisé avec le reste du site.
Comment utiliser :

Sélectionne une ligue dans le menu déroulant.
Écris ton message dans le champ de texte.
Appuie sur Entrée ou clique sur "Envoyer" pour envoyer ton message.
Les messages s'affichent en temps réel pour tous les membres de la ligue.

📊 4. Résultats (results.html)
Fonctionnalités disponibles :

Score final : Points obtenus, pourcentage de réussite.
Détails : Thème, difficulté, nombre de questions.
Partage du score : Bouton pour partager sur Twitter ou par email.
Retour à l'accueil : Bouton pour revenir à la page principale.
Comment utiliser :

Consulte ton score et tes statistiques.
Clique sur "Partager mon score" pour partager tes résultats.
Clique sur "Retour à l'accueil" pour revenir à la page d'accueil.

🔌 API Backend
Voici la liste des endpoints disponibles pour interagir avec le backend.
(Base URL : http://localhost:3000/api en développement, ou l'URL de ton backend déployé en production.)

📋 Endpoints disponibles

  
    
      Endpoint
      Méthode
      Description
      Paramètres
      Exemple de requête
    
  
  
    
      /themes
      GET
      Récupère tous les thèmes
      -
      GET /api/themes
    
    
      /themes/:id
      GET
      Récupère un thème par ID
      id (ID du thème)
      GET /api/themes/1
    
    
      /questions
      GET
      Récupère toutes les questions
      -
      GET /api/questions
    
    
      /questions/theme/:themeId
      GET
      Récupère les questions par thème
      themeId (ID du thème)
      GET /api/questions/theme/1
    
    
      /questions/random
      GET
      Récupère une question aléatoire
      themeId, difficulty (optionnels)
      GET /api/questions/random?themeId=1&difficulty=Facile
    
    
      /questions/difficulty/:difficulty
      GET
      Récupère les questions par difficulté
      difficulty (Facile/Moyenne/Difficile)
      GET /api/questions/difficulty/Facile
    
    
      /scores
      POST
      Sauvegarde un score
      playerName, score, totalQuestions, themeId, difficulty
      POST /api/scores
    
    
      /scores/top
      GET
      Récupère le top 3 des scores
      -
      GET /api/scores/top
    
    
      /scores/player/:playerId
      GET
      Récupère les scores d'un joueur
      playerId (ID du joueur)
      GET /api/scores/player/1
    
    
      /scores/theme/:themeId
      GET
      Récupère les scores par thème
      themeId (ID du thème)
      GET /api/scores/theme/1
    
    
      /leagues
      POST
      Crée une ligue
      name, ownerId
      POST /api/leagues
    
    
      /leagues/join
      POST
      Rejoint une ligue
      leagueId, playerId
      POST /api/leagues/join
    
    
      /leagues/player/:playerId
      GET
      Récupère les ligues d'un joueur
      playerId (ID du joueur)
      GET /api/leagues/player/1
    
    
      /leagues/:leagueId/members
      GET
      Récupère les membres d'une ligue
      leagueId (ID de la ligue)
      GET /api/leagues/1/members
    
    
      /leagues/:leagueId/leave/:playerId
      DELETE
      Quitte une ligue
      leagueId, playerId
      DELETE /api/leagues/1/leave/1
    
    
      /players
      GET
      Récupère tous les joueurs
      -
      GET /api/players
    
    
      /players
      POST
      Crée un joueur
      pseudo
      POST /api/players
    
    
      /chat
      POST
      Sauvegarde un message
      text, sender, leagueId
      POST /api/chat
    
    
      /chat/:leagueId
      GET
      Récupère les messages d'une ligue
      leagueId (ID de la ligue)
      GET /api/chat/1
    
  





💡 Améliorations possibles

🚀 Fonctionnalités à ajouter

  
    
      Priorité
      Amélioration
      Description
      Difficulté
      Technologies requises
    
  
  
    
      ⭐⭐⭐⭐⭐
      Authentification sécurisée
      Remplacer le système de pseudo par une authentification avec email/mot de passe (hashé).
      Moyenne
      bcrypt, JWT, Firebase Auth
    
    
      ⭐⭐⭐⭐⭐
      WebSockets pour le chat
      Remplacer le polling par des WebSockets pour un chat en temps réel instantané.
      Moyenne
      Socket.io
    
    
      ⭐⭐⭐⭐
      Mode multijoueur en direct
      Permettre à plusieurs joueurs de jouer en même temps sur les mêmes questions.
      Élevée
      WebSockets, gestion de sessions
    
    
      ⭐⭐⭐⭐
      Système de badges et récompenses
      Ajouter des badges pour les performances (ex: "10 quiz terminés", "Score parfait").
      Moyenne
      Base de données (nouvelle table badges)
    
    
      ⭐⭐⭐
      Historique des parties
      Permettre aux joueurs de consulter leurs anciennes parties.
      Facile
      Base de données (table existante scores)
    
    
      ⭐⭐⭐
      Statistiques avancées
      Ajouter des graphiques (ex: évolution des scores, thèmes préférés).
      Moyenne
      Chart.js, D3.js
    
    
      ⭐⭐⭐
      Système de défis
      Permettre aux joueurs de se lancer des défis (ex: "Bat mon score !").
      Moyenne
      Backend (nouvelle table challenges)
    
    
      ⭐⭐
      Upload d'avatars
      Permettre aux joueurs de télécharger une image de profil.
      Facile
      Multer (Node.js), stockage cloud (Firebase Storage)
    
    
      ⭐⭐
      Notations des questions
      Permettre aux joueurs de noter les questions (like/dislike).
      Facile
      Base de données (nouvelle table ratings)
    
    
      ⭐⭐
      Partage de ligues
      Permettre de partager un lien pour rejoindre une ligue.
      Facile
      Génération de liens uniques
    
    
      ⭐
      Sons personnalisables
      Permettre aux joueurs de choisir leurs sons de feedback.
      Facile
      Stockage local ou cloud
    
    
      ⭐
      Animations avancées
      Ajouter des animations CSS/JS pour le feedback (ex: confettis).
      Facile
      CSS Animations, Canvas API
    
  





⚡ Optimisations techniques

  
    
      Amélioration
      Description
      Impact
    
  
  
    
      Cache des requêtes
      Ajouter un cache (Redis) pour les requêtes fréquentes (ex: top scores).
      ⚡ Performance
    
    
      Pagination
      Ajouter une pagination pour les listes longues (ex: historique des scores).
      ⚡ Performance
    
    
      Indexation MySQL
      Ajouter des index sur les colonnes fréquemment interrogées (ex: player_id dans scores).
      ⚡ Performance
    
    
      Compression des réponses
      Utiliser compression middleware pour réduire la taille des réponses HTTP.
      ⚡ Performance
    
    
      Lazy loading
      Charger les images et ressources JS/CSS de manière asynchrone.
      ⚡ Performance
    
    
      Minification
      Minifier les fichiers CSS/JS pour la production.
      ⚡ Performance
    
    
      CDN pour les assets
      Utiliser un CDN pour servir les fichiers statiques (CSS, JS, images).
      ⚡ Performance
    
    
      Load balancing
      Ajouter un load balancer pour gérer le trafic élevé.
      ⚡ Scalabilité
    
    
      Tests unitaires
      Ajouter des tests pour le backend (Jest/Mocha) et le frontend (Cypress).
      🛡️ Fiabilité
    
    
      Logging
      Ajouter des logs structurés pour le débogage (Winston, Morgan).
      🐛 Maintenance
    
  





🎨 Améliorations UX/UI

  
    
      Amélioration
      Description
      Impact
    
  
  
    
      Design plus moderne
      Utiliser un framework CSS (Tailwind, Bootstrap) ou des composants plus élégants.
      🎨 Esthétique
    
    
      Accessibilité
      Améliorer l'accessibilité (contrastes, ARIA labels, navigation clavier).
      ♿ Inclusivité
    
    
      Responsive amélioré
      Optimiser l'affichage sur mobile (ex: menu hamburger).
      📱 Mobile
    
    
      Feedback visuel
      Ajouter des animations (ex: confettis après un score parfait).
      🎉 Expérience utilisateur
    
    
      Tutoriel
      Ajouter un tutoriel pour les nouveaux utilisateurs.
      📚 Onboarding
    
    
      Notifications
      Ajouter des notifications (ex: "Nouveau message dans ta ligue !").
      🔔 Engagement
    
    
      Dark mode amélioré
      Ajouter des transitions fluides entre les thèmes.
      🌓 Esthétique
    
    
      Personnalisation
      Permettre aux utilisateurs de personnaliser les couleurs/thèmes.
      🎨 Expérience utilisateur
    
    
      Micro-interactions
      Ajouter des petites animations (ex: like sur un message).
      🎉 Expérience utilisateur
    
  





🔒 Améliorations de sécurité

  
    
      Amélioration
      Description
      Impact
    
  
  
    
      Hashage des mots de passe
      Utiliser bcrypt pour hacher les mots de passe.
      🔒 Sécurité
    
    
      JWT pour l'authentification
      Remplacer les sessions par des tokens JWT.
      🔒 Sécurité
    
    
      Validation des entrées
      Valider et sanitizer toutes les entrées utilisateur (ex: contre les injections SQL).
      🔒 Sécurité
    
    
      Rate limiting
      Limiter le nombre de requêtes par IP pour éviter les attaques DDoS.
      🔒 Sécurité
    
    
      CSRF Protection
      Ajouter une protection contre les attaques CSRF.
      🔒 Sécurité
    
    
      HTTPS
      Forcer HTTPS en production.
      🔒 Sécurité
    
    
      CORS restreint
      Limiter les origines autorisées en production.
      🔒 Sécurité
    
    
      Sécurité des cookies
      Configurer les cookies avec HttpOnly et Secure.
      🔒 Sécurité
    
    
      Audit de sécurité
      Utiliser des outils comme helmet pour sécuriser les headers HTTP.
      🔒 Sécurité
    
  





📊 Améliorations pour le déploiement

  
    
      Amélioration
      Description
      Outils
    
  
  
    
      CI/CD
      Automatiser les tests et le déploiement avec GitHub Actions.
      GitHub Actions
    
    
      Docker
      Containeriser l'application pour un déploiement plus simple.
      Docker
    
    
      Monitoring
      Ajouter un système de monitoring (ex: Prometheus, Grafana).
      Prometheus, Grafana
    
    
      Scalabilité
      Utiliser un service comme Kubernetes pour gérer le scaling.
      Kubernetes
    
    
      Backup automatique
      Sauvegarder automatiquement la base de données.
      Cron jobs, AWS Backup
    
    
      Health checks
      Ajouter des endpoints de health check pour le monitoring.
      Express middleware
    
    
      Environment variables
      Utiliser un service comme dotenv en production (ex: AWS Parameter Store).
      AWS Parameter Store
    
  





🌍 Améliorations pour l'internationalisation

  
    
      Amélioration
      Description
      Impact
    
  
  
    
      Traduction
      Ajouter le support de plusieurs langues (français, anglais, etc.).
      🌍 Accessibilité
    
    
      RTL (Right-to-Left)
      Supporter les langues comme l'arabe ou l'hébreu.
      🌍 Accessibilité
    
    
      Fuseau horaire
      Afficher les dates/heures dans le fuseau horaire de l'utilisateur.
      🌍 Expérience utilisateur
    
  





📱 Améliorations pour mobile

  
    
      Amélioration
      Description
      Impact
    
  
  
    
      PWA (Progressive Web App)
      Permettre l'installation de l'app comme une application native.
      📱 Mobile
    
    
      Notifications push
      Envoyer des notifications push pour les nouveaux messages/defis.
      📱 Engagement
    
    
      Gestes tactiles
      Ajouter des gestes pour naviguer (ex: swipe pour changer de question).
      📱 Expérience utilisateur
    
    
      Optimisation des images
      Utiliser des images adaptées à la taille de l'écran.
      ⚡ Performance
    
  





🤖 Améliorations avec l'IA

  
    
      Amélioration
      Description
      Outils
    
  
  
    
      Génération de questions
      Utiliser une IA pour générer des questions automatiquement.
      OpenAI API, Hugging Face
    
    
      Traduction automatique
      Traduire les questions en temps réel.
      Google Translate API
    
    
      Recommandations
      Recommander des thèmes/questions en fonction des performances.
      Machine Learning (scikit-learn)
    
    
      Chatbot
      Ajouter un chatbot pour répondre aux questions des utilisateurs.
      Dialogflow, Rasa
    
  





🐛 Débogage

❌ Problèmes courants et solutions

  
    
      Problème
      Cause possible
      Solution
    
  
  
    
      Backend ne démarre pas
      Port 3000 déjà utilisé
      Change le PORT dans .env (ex: PORT=3001)
    
    
      Erreur CORS
      Frontend et backend sur des ports différents
      Vérifie que cors() est bien appelé dans server.js
    
    
      Connexion MySQL échouée
      Identifiants incorrects dans .env
      Vérifie DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
    
    
      Tables SQL manquantes
      data.sql non importé
      Exécute SOURCE DATA/data.sql dans MySQL
    
    
      404 sur les requêtes API
      Backend non lancé ou URL incorrecte
      Lance npm run dev et vérifie http://localhost:3000/api/themes
    
    
      Les questions ne s'affichent pas
      Base de données vide
      Vérifie que questions a des données avec SELECT * FROM questions;
    
    
      Les sons ne jouent pas
      Fichiers correct.mp3/wrong.mp3 manquants
      Ajoute-les dans frontend/assets/sounds/
    
    
      Thème jour/nuit ne fonctionne pas
      localStorage bloqué
      Teste dans un navigateur en mode normal (pas incognito)
    
    
      Les ligues ne s'affichent pas
      playerId non défini
      Vérifie que tu es bien connecté (pseudo enregistré)
    
    
      Les messages du chat ne s'affichent pas
      leagueId non défini
      Sélectionne une ligue dans le menu déroulant
    
  





🔍 Outils de débogage
Backend


Logs du serveur :

npm run dev

→ Les erreurs s'affichent dans le terminal.


Tester les endpoints API :

Utilise Postman ou Insomnia.
Exemple :

curl http://localhost:3000/api/themes



Frontend


Console du navigateur (F12 → Console) :

Affiche les erreurs JavaScript.
Vérifie que les requêtes fetch fonctionnent.


Onglet Network (F12 → Network) :

Vérifie que les requêtes HTTP vers le backend retournent un code 200.
Inspecte le contenu des réponses.

Base de données

MySQL en ligne de commande :

mysql -u root -p -e "USE sparpulse; SELECT * FROM questions LIMIT 5;"


MySQL Workbench :

Outil graphique pour explorer la base de données.


🌍 Déploiement

📦 1. Déployer le backend (Node.js)
Option 1 : Render (recommandé)

Crée un compte sur Render.
Crée un nouveau service :

Sélectionne Web Service.
Connecte ton dépôt GitHub (ou téléverse le dossier Quiz).
Dossier racine : Quiz/backend
Commande de build : npm install
Commande de démarrage : node server.js
Variables d'environnement : Ajoute DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT.

Déploie → Ton backend sera accessible sur une URL comme https://sparpulse-backend.onrender.com.
Option 2 : Heroku

Installe le Heroku CLI.
Exécute :
bash
Copy

heroku login
heroku create sparpulse-backend
git push heroku main




Configure les variables d'environnement :

heroku config\:set DB_HOST=... DB_USER=... DB_PASSWORD=... DB_NAME=sparpulse PORT=3000

Option 3 : Railway

Crée un compte sur Railway.
Crée un nouveau projet et importe ton dépôt GitHub.
Configure les variables d'environnement dans les paramètres du projet.
Déploie → Ton backend sera accessible sur une URL Railway.

🌐 2. Déployer le frontend
Option 1 : Firebase Hosting

Installe Firebase CLI :

npm install -g firebase-tools
firebase login


Initialise Firebase Hosting dans Quiz/frontend :

cd frontend
firebase init hosting

Sélectionne ton projet Firebase.
Dossier public : pages
Single Page Application : Non

Déploie :

firebase deploy

→ Ton frontend sera accessible sur https://spakrpulse.web.app.
Option 2 : Netlify

Glisse-dépose le dossier Quiz/frontend sur Netlify.
Configure les redirections pour les routes (ex: /Quiz.html → /pages/Quiz.html).
Option 3 : Vercel

Crée un compte sur Vercel.
Importe ton dépôt GitHub et configure le dossier frontend comme racine.
Déploie → Ton frontend sera accessible sur une URL Vercel.

🔗 3. Mettre à jour le frontend pour le déploiement
Dans tous les fichiers JS du frontend, remplace :

const BACKEND_URL = 'http://localhost:3000';

par :

// En production, utilise l'URL de ton backend déployé
const BACKEND_URL = 'https://ton-backend-deploye.onrender.com'; // Remplace par ton URL


Astuce : Pour gérer à la fois le développement et la production, tu peux utiliser :

const BACKEND_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : 'https://ton-backend-deploye.onrender.com';


🗃️ 4. Déployer la base de données
Si tu utilises MySQL en local (XAMPP), tu ne peux pas le déployer directement.
Solutions :

Utiliser un hébergeur MySQL :

PlanetScale (gratuit pour les petits projets).
Railway (inclut MySQL).
AWS RDS (payant).

Migrer vers Firebase :

Utilise Firestore pour remplacer MySQL (moins de configuration).

Utiliser SQLite :

Pour les petits projets, SQLite peut être une alternative (mais moins performant pour le multi-utilisateurs).


🤝 Contribuer
Les contributions sont les bienvenues ! Voici comment contribuer :

Fork le projet.
Crée une branche (git checkout -b feature/ma-fonctionnalité).
Commit tes changements (git commit -m "Ajout de ma fonctionnalité").
Push vers la branche (git push origin feature/ma-fonctionnalité).
Ouvre une Pull Request.


Tous les contributeurs qui aideront à améliorer ce projet sont accepter !

# 👨‍💻 Auteur

**MPOUAMZE MATHIS**

Elève  passionné par le développement logiciel, le Full Stack et l'Intelligence Artificielle.

**GitHub :**
> https://github.com/MathisDev-mp

---

# 📄 Licence

Ce projet est distribué sous la licence **MIT**.

Consultez le fichier **LICENSE** pour plus d'informations.

---

<div align="center">

### Développé avec ❤️ par

# **MPOUAMZE MATHIS**

© 2026 — Tous droits réservés.

</div>
