import { initializeApp , getApps , getApp} from "firebase/app";
import { getFirestore } from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyD8j8BVMflVjB34fzJKt4yY5-Wfc9pauJI",
  authDomain: "sharenotes-1225.firebaseapp.com",
  projectId: "sharenotes-1225",
  storageBucket: "sharenotes-1225.firebasestorage.app",
  messagingSenderId: "257664818665",
  appId: "1:257664818665:web:60f20d2c83f680fe6c7f78"
};

const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
