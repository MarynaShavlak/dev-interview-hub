// firebaseConfig.ts
import { createContext, useMemo } from 'react';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBiGo0Kq8YUFPYQ0DetFJxOuqUh3C7nGQA',
    authDomain: 'dev-interview-hub.firebaseapp.com',
    projectId: 'dev-interview-hub',
    storageBucket: 'dev-interview-hub.appspot.com',
    messagingSenderId: '195551545741',
    appId: '1:195551545741:web:e56f301b462aa7f15c95c4',
    measurementId: 'G-68TP2P78NV',
};

interface FirebaseContextType {
    firebaseApp: FirebaseApp;
    auth: Auth;
    firestore: Firestore;
}

const defaultContextValue: FirebaseContextType = {
    firebaseApp: {} as FirebaseApp,
    auth: {} as Auth,
    firestore: {} as Firestore,
};

export const Context = createContext<FirebaseContextType>(defaultContextValue);

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const auth = getAuth();

export const useFirebaseContext = () => {
    return useMemo(
        () => ({
            firebaseApp,
            auth,
            firestore,
        }),
        [],
    );
};
