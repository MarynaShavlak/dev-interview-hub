/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { v4 } = require('uuid');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { getFirestore } = require('firebase-admin/firestore');

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello, ninjas!');
});

admin.initializeApp();
const db = getFirestore();

// async function createNotification(notification) {
//     try {
//         await db.collection('notifications').add(notification);
//         console.log('Notification created:', notification);
//     } catch (error) {
//         console.error('Error creating notification:', error);
//     }
// }

async function createNotification(notification) {
    try {
        await db
            .collection('notifications')
            .doc('general')
            .collection('messages')
            .doc(notification.id) // Store using a unique ID
            .set(notification);
        console.log('Notification created:', notification);
    } catch (error) {
        console.error('Error creating notification:', error);
    }
}

async function createPersonalNotification(notification, userId) {
    try {
        await db
            .collection('notifications')
            .doc('personal')
            .collection(userId)
            .doc(notification.id) // Store using a unique ID
            .set(notification);
        console.log('Notification created:', notification);
    } catch (error) {
        console.error('Error creating personal notification:', error);
    }
}

exports.articleCreated = onDocumentCreated(
    'articles/{articleId}',
    async (event) => {
        const doc = event.data;
        if (!doc) return null; // Ensure the document exists

        const article = doc.data();
        const { category, user } = article;
        const { id: userId } = user;
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
            authorId: userId,
            dismissedBy: [userId],
        };

        return createNotification(notification);
    },
);

exports.notifyArticleCommented = onDocumentCreated(
    'comments/{commentId}',
    async (event) => {
        const doc = event.data;
        if (!doc) return null;

        const comment = doc.data();
        const { articleId, user, text } = comment;
        const { id: userId, username } = user;

        const articleQuerySnapshot = await db
            .collection('articles')
            .where('id', '==', articleId)
            .limit(1)
            .get();

        if (articleQuerySnapshot.empty) {
            console.log(`No article found with id: ${articleId}`);
            return null;
        }

        // Get the first matching article
        const articleDoc = articleQuerySnapshot.docs[0];
        const articleData = articleDoc.data();

        const notification = {
            id: v4(),
            title: 'New comment on your article!',
            localizationMessage: {
                en: `User <b>${username}</b> commented your article "${articleData.title.slice(0, 30)}" with comment "${text.slice(0, 20)}"`,
                uk: `Користувач <b>${username}</b> додав до Вашої статті  "${articleData.title.slice(0, 30)}" коментар "${text.slice(0, 20)}"`,
            },
            href: `/article/${articleData.id}`,
            timestamp: new Date().toISOString(),
            type: 'personal',
            authorId: userId,
            dismissedBy: [userId],
        };

        return createPersonalNotification(notification, articleData.user.id);
    },
);

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
