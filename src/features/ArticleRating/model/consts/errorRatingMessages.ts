export const ERROR_RATING_MESSAGES = {
    USER_AUTH_MISSING: 'User authentication data is missing.',
    FETCH_RATINGS_FAIL: 'Failed to fetch article ratings.',
    FETCH_RATINGS_BY_ARTICLE_IDS_FAIL: (articleIds: string[]) =>
        `Failed to fetch ratings for article IDs: ${articleIds.join(', ')}`,
    FETCH_RATING_BY_USER_FAIL: (userId: string, articleId: string) =>
        `Failed to fetch rating for article with ID "${articleId}" by user with ID "${userId}".`,
    FETCH_RATING_SNAPSHOT_FAIL: 'Error in fetching ratings snapshot.',
    ADD_RATING_FAIL: 'Failed to add new article rating.',
    RATE_RETRIEVAL_FAIL: 'Failed to retrieve created rating.',
    RATE_ARTICLE_FAIL: 'Error occurred while rating the article.',
    DELETE_RATINGS_FAIL: 'Error deleting ratings for the article.',
    DELETE_RATING_FAIL: (ratingId: string) =>
        `Failed to delete rating with ID "${ratingId}".`,
    RATING_ID_REQUIRED: 'Rating ID is required.',
    RATING_FEEDBACK_REQUIRED: 'Rating feedback cannot be empty.',
    ARTICLE_ID_REQUIRED: 'Article ID is required.',
    USER_ID_REQUIRED: 'User ID is required.',
    INVALID_RATING_VALUE: 'Rating value must be between 1 and 5.',
    RATING_ALREADY_EXISTS: 'User has already rated this article',
    DELETE_RATINGS_BY_ARTICLE_ID_FAIL: (articleId: string) =>
        `Failed to delete ratings for article with ID "${articleId}".`,
};
