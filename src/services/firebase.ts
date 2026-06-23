import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAAYAZggoso-iMStGftuEd-HvED_ukjOCw",
    authDomain: "coinvest-app.firebaseapp.com",
    projectId: "coinvest-app",
    storageBucket: "coinvest-app.firebasestorage.app",
    messagingSenderId: "62803073808",
    appId: "1:62803073808:web:7f4aaa709f9b4124dfe395"
  };


  const app = initializeApp(firebaseConfig);
  export const auth = getAuth (app);
  export const db = getFirestore (app);
  export const storage = getStorage(app)