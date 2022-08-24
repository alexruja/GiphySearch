import { initializeApp } from "firebase/app";
import { getFirestore} from '@firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "giphysearch-1ca9d.firebaseapp.com",
  projectId: "giphysearch-1ca9d",
  storageBucket: "giphysearch-1ca9d.appspot.com",
  messagingSenderId: "669339223025",
  appId: "1:669339223025:web:1507f140842956e8effa50",
  measurementId: "G-3K11NYPK8Z",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

