import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAKtYhMGUNL53J9t4OmP4Meu-EchyqAeUI',
  authDomain: 'adv-app-5f731.firebaseapp.com',
  projectId: 'adv-app-5f731',
  storageBucket: 'adv-app-5f731.firebasestorage.app',
  messagingSenderId: '301625069428',
  appId: '1:301625069428:web:a96a16a5ebe1d2730b6621',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: 'select_account' });

export { auth, googleProvider };
