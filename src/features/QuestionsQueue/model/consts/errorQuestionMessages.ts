export const ERROR_QUESTION_MESSAGES = {
    ADD_QUESTION_FAIL: 'Error adding new question.',
    // ARTICLE_DETAILS_MISSING: 'Article details are missing.',
    USER_NOT_FOUND: 'User not found.',
    QUESTION_ADD_API_FAIL: 'No data received from API.',
    QUESTION_ID_REQUIRED: 'Question ID is required.',
    QUESTION_RETRIEVAL_FAIL: 'Failed to retrieve created question.',
    QUESTION_TEXT_REQUIRED: 'Question text cannot be empty.',
    QUESTIONS_BY_USER_ID_FETCH_FAIL: (userId: string) =>
        `Failed to fetch questions for user with ID "${userId}".`,
    // COMMENTS_BY_ARTICLE_IDS_FETCH_FAIL: (articleIds: string[]) =>
    //     `Failed to fetch comments for the given article IDs: "${articleIds.join(',')}".`,
    // COMMENTS_FETCH_FAIL: 'Failed to fetch comments.',
    QUESTIONS_SNAPSHOT_FAIL: 'Error in questions snapshot.',
    // DELETE_COMMENTS_BY_ARTICLE_ID_FAIL: (articleId: string) =>
    //     `Failed to delete comments for article with ID "${articleId}".`,
    DELETE_ERROR: 'Something went wrong when deleting question.',
    USER_AUTH_MISSING: 'User authentication data is missing.',
};
