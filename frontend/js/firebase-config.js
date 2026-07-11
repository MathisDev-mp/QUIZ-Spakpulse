// Import des modules Firebase depuis le CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Configuration Firebase (à remplacer par tes propres clés)
const firebaseConfig = {
  apiKey: "TA_CLE_API",          // Remplace par ta clé API Firebase
  authDomain: "sparpulse.firebaseapp.com",
  projectId: "sparpulse",
  storageBucket: "sparpulse.appspot.com",
  messagingSenderId: "123456789", // Remplace par ton ID
  appId: "1:123456789:web:abcdef" // Remplace par ton App ID
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Exporter les services
export const db = getFirestore(app);
export const auth = getAuth(app);