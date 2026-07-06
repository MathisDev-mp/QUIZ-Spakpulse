rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /questions/{question} {
      allow read: if true;
      allow write: if false; // Seul l'admin peut écrire
    }
    match /scores/{score} {
      allow read: if true;
      allow create: if request.auth != null; // Seul les utilisateurs connectés peuvent sauvegarder un score
    }
    match /themes/{theme} {
      allow read: if true;
      allow write: if false;
    }
  }
}