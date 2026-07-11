rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Règles pour les questions
    match /questions/{question} {
      allow read: if true; // Tout le monde peut lire les questions
      allow write: if false; // Seul l'admin peut écrire (via backend ou Firebase Console)
    }

    // Règles pour les scores
    match /scores/{score} {
      allow read: if true; // Tout le monde peut voir les scores
      allow create: if request.auth != null; // Seul les utilisateurs connectés peuvent sauvegarder un score
      allow update, delete: if false; // Interdit la modification/suppression
    }

    // Règles pour les thèmes
    match /themes/{theme} {
      allow read: if true; // Tout le monde peut lire les thèmes
      allow write: if false; // Seul l'admin peut écrire
    }

    // Règles pour les ligues
    match /leagues/{league} {
      allow read: if request.auth != null; // Seul les utilisateurs connectés peuvent voir les ligues
      allow create: if request.auth != null; // Seul les utilisateurs connectés peuvent créer une ligue
      allow update: if request.auth != null &&
                    (request.resource.data.members.hasAny(request.auth.token.email) ||
                     resource.data.owner == request.auth.token.email); // Seul les membres ou le propriétaire peuvent modifier
      allow delete: if request.auth != null && resource.data.owner == request.auth.token.email; // Seul le propriétaire peut supprimer
    }

    // Règles pour les messages du chat
    match /chat_messages/{message} {
      allow read: if request.auth != null; // Seul les utilisateurs connectés peuvent lire
      allow create: if request.auth != null &&
                    request.resource.data.leagueId != null &&
                    request.resource.data.sender != null &&
                    request.resource.data.text != null; // Vérifier que les champs requis sont présents
      allow update, delete: if false; // Interdit la modification/suppression
    }
  }
}