// firebaseConfig.ts
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBiGo0Kq8YUFPYQ0DetFJxOuqUh3C7nGQA',
    authDomain: 'dev-interview-hub.firebaseapp.com',
    projectId: 'dev-interview-hub',
    storageBucket: 'dev-interview-hub.firebasestorage.app',
    messagingSenderId: '195551545741',
    appId: '1:195551545741:web:e56f301b462aa7f15c95c4',
    measurementId: 'G-68TP2P78NV',
};

interface FirebaseContextType {
    firebaseApp: FirebaseApp;
    auth: Auth;
    firestore: Firestore;
    firebaseStorage: FirebaseStorage;
}

export const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp);
export const auth = getAuth();
export const firebaseStorage = getStorage(firebaseApp);
