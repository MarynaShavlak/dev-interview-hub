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

//
// admin.initializeApp(functions.config().firebase);

// const createNotification = (notification) => {
//     return admin
//         .firestore()
//         .collection('notifications')
//         .add(notification)
//         .then((doc) => console.log('notification added', doc));
// };

// exports.articleCreated = functions.firestore
//     .document('articles/{articleId}')
//     .onCreate((doc) => {
//         const article = doc.data();
//         const notification = {
//             content: 'Added a new article',
//             user: `${article.user.firstName} ${article.user.lastName}`,
//             time: admin.firestore.FieldValue.serverTimestamp(),
//         };
//
//         return createNotification(notification);
//     });

const { v4 } = require('uuid');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello, ninjas!');
});

admin.initializeApp();
const db = getFirestore();

async function createNotification(notification) {
    try {
        await db.collection('notifications').add(notification);
        console.log('Notification created:', notification);
    } catch (error) {
        console.error('Error creating notification:', error);
    }
}

exports.articleCreated = onDocumentCreated(
    'articles/{articleId}',
    async (event) => {
        const doc = event.data;
        if (!doc) return null; // Ensure the document exists

        const article = doc.data();
        const { category } = article;
        const categoryText =
            category.length > 1
                ? `categories ${category.join(', ')}`
                : `category ${category}`;
        const notification = {
            id: v4(),
            title: 'New Article Published!',
            message: `A new article titled "${article.title}" has been added to ${categoryText}. Check it out!`,
            href: `/article/${article.id}`,
            timestamp: new Date().toISOString(),
            type: 'general',
        };

        return createNotification(notification);
    },
);
