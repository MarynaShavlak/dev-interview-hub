/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const { onRequest } = require('firebase-functions/v2/https');
// const logger = require('firebase-functions');
//
// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = onRequest((request, response) => {
//     logger.info('Hello logs!', { structuredData: true });
//     response.send('Hello from Firebase!');
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello, ninjas!');
});

exports.articleCreated = functions.firestore
    .document('articles/{articleId}')
    .onCreate((doc) => {
        const article = doc.data();
        const notification = {
            content: 'Added a new article',
            user: `${article.user.firstName} ${article.user.lastName}`,
            time: admin.firestore.FieldValue.serverTimestamp(),
        };
    });
