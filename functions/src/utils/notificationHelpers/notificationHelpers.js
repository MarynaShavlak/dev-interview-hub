const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');

admin.initializeApp();
const db = getFirestore();

async function createGeneralNotification(notification) {
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

async function getArticleById(articleId) {
    const snapshot = await db
        .collection('articles')
        .where('id', '==', articleId)
        .limit(1)
        .get();
    return snapshot.empty ? null : snapshot.docs[0].data();
}

module.exports = {
    createGeneralNotification,
    createPersonalNotification,
    getArticleById,
};
