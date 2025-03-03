export const ERROR_RATING_MESSAGES = {
    ADD_RATING_FAIL: 'Failed to add new article rating.',
    ARTICLE_ID_REQUIRED: 'Article ID is required.',
    DELETE_RATING_FAIL: (ratingId: string) =>
        `Failed to delete rating with ID "${ratingId}".`,
    DELETE_RATINGS_BY_ARTICLE_ID_FAIL: (articleId: string) =>
        `Failed to delete ratings for article with ID "${articleId}".`,
    DELETE_RATINGS_FAIL: 'Error deleting ratings for the article.',
    FETCH_RATING_BY_USER_FAIL: (userId: string, articleId: string) =>
        `Failed to fetch rating for article with ID "${articleId}" by user with ID "${userId}".`,
    FETCH_RATING_SNAPSHOT_FAIL: 'Error in fetching ratings snapshot.',
    FETCH_RATINGS_BY_ARTICLE_IDS_FAIL: (articleIds: string[]) =>
        `Failed to fetch ratings for article IDs: ${articleIds.join(', ')}`,
    FETCH_RATINGS_FAIL: 'Failed to fetch article ratings.',
    INVALID_RATING_VALUE: 'Rating value must be between 1 and 5.',
    RATE_ARTICLE_FAIL: 'Error occurred while rating the article.',
    RATE_RETRIEVAL_FAIL: 'Failed to retrieve created rating.',
    RATING_ALREADY_EXISTS: 'User has already rated this article',
    RATING_FEEDBACK_REQUIRED: 'Rating feedback cannot be empty.',
    RATING_ID_REQUIRED: 'Rating ID is required.',
    USER_AUTH_MISSING: 'User authentication data is missing.',
    USER_ID_REQUIRED: 'User ID is required.',
};
