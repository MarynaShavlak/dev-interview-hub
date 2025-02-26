const { v4 } = require('uuid');

function truncateText(text, maxLength) {
    return text?.length > maxLength ? `${text?.slice(0, maxLength)}...` : text;
}

function createCommentNotification(article, comment) {
    const { articleId, user, text } = comment;
    const { username } = user;
    const title = truncateText(article.title, 30);
    const commentText = truncateText(text, 20);
    return {
        id: v4(),
        localizationTitle: {
            en: 'New comment on your article!',
            uk: 'Новий коментар до Вашої статті!',
        },
        localizationMessage: {
            en: `User <b>${username}</b> commented your article "${title}" with comment "${commentText}"`,
            uk: `Користувач <b>${username}</b> додав до Вашої статті  "${title}" коментар "${commentText}"`,
        },
        href: `/article/${articleId}`,
        timestamp: new Date().toISOString(),
        type: 'personal_comment',
    };
}

function createRatingNotification(article, rating) {
    const { articleId, user, rate, feedback } = rating;
    const { username } = user;
    const title = truncateText(article.title, 30);
    const feedbackText = truncateText(feedback, 20);
    const stars = '⭐'.repeat(rate);

    const enMessage = `User <b>${username}</b> rated your article "${title}" with ${stars} ${
        feedback ? ` and left feedback: "${feedbackText}"` : ''
    }.`;
    const ukMessage = `Користувач <b>${username}</b> оцінив Вашу статтю "${title}" на ${stars}
${feedback ? ` і залишив відгук: "${feedbackText}"` : ''}.`;
    return {
        id: v4(),
        localizationTitle: {
            en: 'Your article has been rated!',
            uk: 'Вашу статтю було оцінено!',
        },
        localizationMessage: {
            en: enMessage,
            uk: ukMessage,
        },
        href: `/article/${articleId}`,
        timestamp: new Date().toISOString(),
        type: 'personal_rating',
    };
}

module.exports = { createRatingNotification, createCommentNotification };
