import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBc7_vRiqS0pFr_wdSDMvcTfDdBcie7fI8",
  authDomain: "chatbox-7d903.firebaseapp.com",
  projectId: "chatbox-7d903",
  storageBucket: "chatbox-7d903.firebasestorage.app",
  messagingSenderId: "868255283691",
  appId: "1:868255283691:web:6a0b3fda2378b09029c1ae"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };