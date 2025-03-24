import firebase from 'firebase/compat/app';
import { attachCustomCommands } from 'cypress-firebase';
import * as commonCommands from './commands/common';
import * as profileCommands from './commands/profile';
import * as articleCommands from './commands/article';
import * as commentsCommands from './commands/comments';
import * as ratingCommands from './commands/rating';
import * as articlesListCommands from './commands/articles-list';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import { firebaseConfig } from '../../json-server/firebase';

Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileCommands);
Cypress.Commands.addAll(articleCommands);
Cypress.Commands.addAll(commentsCommands);
Cypress.Commands.addAll(ratingCommands);
Cypress.Commands.addAll(articlesListCommands);

// const fbConfig = {
//     apiKey: 'AIzaSyBiGo0Kq8YUFPYQ0DetFJxOuqUh3C7nGQA',
//     authDomain: 'dev-interview-hub.firebaseapp.com',
//     projectId: 'dev-interview-hub',
//     storageBucket: 'dev-interview-hub.firebasestorage.app',
//     messagingSenderId: '195551545741',
//     appId: '1:195551545741:web:e56f301b462aa7f15c95c4',
//     measurementId: 'G-68TP2P78NV',
// };
firebase.initializeApp(firebaseConfig);
attachCustomCommands({ Cypress, cy, firebase });

export {};
