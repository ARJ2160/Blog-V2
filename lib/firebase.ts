import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'nextblog-v2.firebaseapp.com',
  projectId: 'nextblog-v2',
  storageBucket: 'nextblog-v2.appspot.com',
  messagingSenderId: '942732972197',
  appId: '1:942732972197:web:15702c7991a2f7476b3d4c'
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
