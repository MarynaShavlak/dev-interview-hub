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
// const admin = require('firebase-admin');
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
// const { getFirestore } = require('firebase-admin/firestore');
const {
    createGeneralNotification,
    createPersonalNotification,
    getArticleById,
} = require('./src/utils/notificationHelpers/notificationHelpers');

const {
    createCommentNotification,
    createRatingNotification,
} = require('./src/utils/createNotificationObject/createNotificationObject');

// function truncateText(text, maxLength) {
//     return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
// }
//
// function createCommentNotification(article, comment) {
//     const { articleId, user, text } = comment;
//     const { username } = user;
//     const title = truncateText(article.title, 30);
//     const commentText = truncateText(text, 20);
//     return {
//         id: v4(),
//         localizationTitle: {
//             en: 'New comment on your article!',
//             uk: 'Новий коментар до Вашої статті!',
//         },
//         localizationMessage: {
//             en: `User <b>${username}</b> commented your article "${title}" with comment "${commentText}"`,
//             uk: `Користувач <b>${username}</b> додав до Вашої статті  "${title}" коментар "${commentText}"`,
//         },
//         href: `/article/${articleId}`,
//         timestamp: new Date().toISOString(),
//         type: 'personal_comment',
//     };
// }
//
// function createRatingNotification(article, rating) {
//     const { articleId, user, rate, feedback } = rating;
//     const { username } = user;
//     const title =
//         article.title.length > 30
//             ? `${article.title.slice(0, 30)}...`
//             : article.title;
//     const feedbackText =
//         feedback?.length > 20 ? `${feedback?.slice(0, 20)}...` : feedback;
//     const stars = '⭐'.repeat(rate);
//
//     const enMessage = `User <b>${username}</b> rated your article "${title}" with ${stars} ${
//         feedback ? ` and left feedback: "${feedbackText}"` : ''
//     }.`;
//     const ukMessage = `Користувач <b>${username}</b> оцінив Вашу статтю "${title}" на ${stars}
// ${feedback ? ` і залишив відгук: "${feedbackText}"` : ''}.`;
//     return {
//         id: v4(),
//         localizationTitle: {
//             en: 'Your article has been rated!',
//             uk: 'Вашу статтю було оцінено!',
//         },
//         localizationMessage: {
//             en: enMessage,
//             uk: ukMessage,
//         },
//         href: `/article/${articleId}`,
//         timestamp: new Date().toISOString(),
//         type: 'personal_rating',
//     };
// }

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

        // const { articleId, user, rate, feedback } = rating;
        // const { username } = user;

        // const articleQuerySnapshot = await db
        //     .collection('articles')
        //     .where('id', '==', articleId)
        //     .limit(1)
        //     .get();
        //
        // if (articleQuerySnapshot.empty) {
        //     console.log(`No article found with id: ${articleId}`);
        //     return null;
        // }

        // const articleDoc = articleQuerySnapshot.docs[0];
        // const articleData = articleDoc.data();
        //         const title =
        //             articleData.title.length > 30
        //                 ? `${articleData.title.slice(0, 30)}...`
        //                 : articleData.title;
        //         const feedbackText =
        //             feedback?.length > 20 ? `${feedback?.slice(0, 20)}...` : feedback;
        //         const stars = '⭐'.repeat(rate);
        //
        //         const enMessage = `User <b>${username}</b> rated your article "${title}" with ${stars} ${
        //             feedback
        //                 ? `
        //         and left feedback: "${feedbackText}"`
        //                 : ''
        //         }.`;
        //         const ukMessage = `Користувач <b>${username}</b> оцінив Вашу статтю "${title}" на ${stars}
        // ${feedback ? ` і залишив відгук: "${feedbackText}"` : ''}.`;
        //         const notification = {
        //             id: v4(),
        //             localizationTitle: {
        //                 en: 'Your article has been rated!',
        //                 uk: 'Вашу статтю було оцінено!',
        //             },
        //             localizationMessage: {
        //                 en: enMessage,
        //                 uk: ukMessage,
        //             },
        //             href: `/article/${articleData.id}`,
        //             timestamp: new Date().toISOString(),
        //             type: 'personal_rating',
        //         };
        const notification = createRatingNotification(article, rating);
        return createPersonalNotification(notification, articleData.user.id);
    },
);

// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send('Hello, ninjas!');
// });
