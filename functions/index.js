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
const { onSchedule } = require('firebase-functions/v2/scheduler');
// const admin = require('firebase-admin');
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
// const { getFirestore } = require('firebase-admin/firestore');
const {
    createGeneralNotification,
    createPersonalNotification,
    getArticleById,
    db,
} = require('./src/utils/notificationHelpers/notificationHelpers');

const {
    cleanupGeneralNotifications,
    cleanupPersonalNotifications,
} = require('./src/utils/cleanNotifications/cleanNotifivations');

const {
    createCommentNotification,
    createRatingNotification,
} = require('./src/utils/createNotificationObject/createNotificationObject');

exports.articleCreated = onDocumentCreated(
    'articles/{articleId}',
    async (event) => {
        const doc = event.data;
        if (!doc) return null; // Ensure the document exists

        const article = doc.data();
        const { category, user } = article;
        const { id: userId } = user;
        const categoryText =
            category.length > 1 ? `${category.join(', ')}` : `${category}`;
        const notification = {
            id: v4(),

            localizationTitle: {
                en: 'New Article Published!',
                uk: 'Опубліковано нову статтю!',
            },
            localizationMessage: {
                en: `A new article, "${article.title}",  has been added to the following categories: ${categoryText}. Check it out!`,
                uk: `Нова стаття "${article.title}" була додана до таких рубрик: ${categoryText}. Скоріше перегляньте!`,
            },
            href: `/article/${article.id}`,
            timestamp: new Date().toISOString(),
            type: 'general',
            authorId: userId,
            dismissedBy: [userId],
        };

        return createGeneralNotification(notification);
    },
);

exports.notifyArticleCommented = onDocumentCreated(
    'comments/{commentId}',
    async (event) => {
        const doc = event.data;
        if (!doc) return null;
        const comment = doc.data();
        const { articleId } = comment;
        const article = await getArticleById(articleId);
        if (!article) {
            console.log(`No article found with id: ${articleId}`);
            return null;
        }
        const notification = createCommentNotification(article, comment);

        return createPersonalNotification(notification, article.user.id);
    },
);

exports.notifyArticleRated = onDocumentCreated(
    'ratings/{ratingId}',
    async (event) => {
        const doc = event.data;
        if (!doc) return null;
        const rating = doc.data();
        const { articleId } = rating;
        const article = await getArticleById(articleId);
        if (!article) {
            console.log(`No article found with id: ${articleId}`);
            return null;
        }
        const notification = createRatingNotification(article, rating);
        return createPersonalNotification(notification, article.user.id);
    },
);

exports.cleanupOldNotifications = onSchedule(
    {
        schedule: '0 0 * * *', // Runs at midnight every day
        timeZone: 'UTC',
        retryCount: 3,
        // Optional parameters if needed:
        memory: '256MiB',
        region: 'us-central1', // Change to your preferred region
    },
    async (event) => {
        try {
            // Calculate the cutoff date (30 days ago)
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            const cutoffTimestamp = thirtyDaysAgo.toISOString();

            console.log(
                `Deleting notifications older than: ${cutoffTimestamp}`,
            );

            // Clean up general notifications
            await cleanupGeneralNotifications(cutoffTimestamp);

            // Clean up personal notifications
            await cleanupPersonalNotifications(cutoffTimestamp);

            console.log('Notification cleanup completed successfully');
            return null;
        } catch (error) {
            console.error('Error during notification cleanup:', error);
            return null;
        }
    },
);
