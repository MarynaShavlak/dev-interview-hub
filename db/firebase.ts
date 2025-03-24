// firebaseConfig.ts
import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { getAuth } from 'firebase/auth';

// export const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID,
//     measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };

export const firebaseConfig = {
    apiKey: 'AIzaSyBiGo0Kq8YUFPYQ0DetFJxOuqUh3C7nGQA',
    projectId: 'dev-interview-hub',
    authDomain: 'dev-interview-hub.firebaseapp.com',
    storageBucket: 'dev-interview-hub.firebasestorage.app',
    messagingSenderId: '195551545741',
    appId: '1:195551545741:web:e56f301b462aa7f15c95c4',
    measurementId: 'G-68TP2P78NV',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp);
export const auth = getAuth();
export const firebaseStorage = getStorage(firebaseApp);
