import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  onSnapshot 
} from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// User's provided Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyANaDk4MTfRYLUgSEpse3W4MHKLYqDgc2E",
  authDomain: "daily-ittefaq.firebaseapp.com",
  projectId: "daily-ittefaq",
  storageBucket: "daily-ittefaq.firebasestorage.app",
  messagingSenderId: "853957383522",
  appId: "1:853957383522:web:3a4a03c78fab2f671f083b",
  measurementId: "G-JC0LQR32DY"
};

// Initialize Firebase App safely (singleton)
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Analytics safely
export let analytics: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      try {
        analytics = getAnalytics(app);
      } catch (err) {
        console.warn('Firebase Analytics init warning:', err);
      }
    }
  }).catch(() => {});
}

// Initialize Auth
export const auth = getAuth(app);

// Google Auth Provider configured for popups
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Cloud Firestore
export const db = getFirestore(app);

// Real Google Sign-In with popup
export async function signInWithGoogleReal(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

// Real Email & Password Login
export async function loginWithEmailPass(email: string, pass: string): Promise<User> {
  const result = await signInWithEmailAndPassword(auth, email, pass);
  return result.user;
}

// Log out
export async function logoutFirebase(): Promise<void> {
  await signOut(auth);
}

export { onAuthStateChanged };
