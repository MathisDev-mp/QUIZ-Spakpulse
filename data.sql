-- Base de données
CREATE DATABASE sparpulse;
USE sparpulse;

-- Table des thèmes
CREATE TABLE themes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  icon VARCHAR(10) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des questions
CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  theme_id INT NOT NULL,
  difficulty ENUM('Facile', 'Moyenne', 'Difficile') NOT NULL,
  question TEXT NOT NULL,
  options JSON NOT NULL, -- ["Option 1", "Option 2", ...]
  correct_answer INT NOT NULL, -- Index de la bonne réponse (0, 1, 2, ...)
  explanation TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (theme_id) REFERENCES themes(id) ON DELETE CASCADE
);

-- Table des joueurs
CREATE TABLE players (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pseudo VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255), -- À hacher en production !
  avatar VARCHAR(255),
  total_points INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des scores
CREATE TABLE scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  player_id INT NOT NULL,
  score INT NOT NULL,
  total_questions INT NOT NULL,
  theme_id INT NOT NULL,
  difficulty ENUM('Facile', 'Moyenne', 'Difficile') NOT NULL,
  percentage INT NOT NULL, -- (score / (total_questions * points_max)) * 100
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
  FOREIGN KEY (theme_id) REFERENCES themes(id) ON DELETE CASCADE
);

-- Table des ligues (optionnelle)
CREATE TABLE leagues (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des membres de ligue (optionnelle)
CREATE TABLE league_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  league_id INT NOT NULL,
  player_id INT NOT NULL,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (league_id) REFERENCES leagues(id) ON DELETE CASCADE,
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
  UNIQUE KEY (league_id, player_id)
);