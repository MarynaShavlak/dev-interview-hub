export const ERROR_QUESTION_MESSAGES = {
    ADD_QUESTION_FAIL: 'Error adding new question.',

    USER_NOT_FOUND: 'User not found.',
    QUESTION_ADD_API_FAIL: 'No data received from API.',
    QUESTION_ID_REQUIRED: 'Question ID is required.',
    QUESTION_RETRIEVAL_FAIL: 'Failed to retrieve created question.',
    QUESTION_TEXT_REQUIRED: 'Question text cannot be empty.',
    QUESTIONS_BY_USER_ID_FETCH_FAIL: (userId: string) =>
        `Failed to fetch questions for user with ID "${userId}".`,

    QUESTIONS_SNAPSHOT_FAIL: 'Error in questions snapshot.',

    DELETE_ERROR: 'Something went wrong when deleting question.',
    USER_AUTH_MISSING: 'User authentication data is missing.',
    UPDATE_QUESTION_ERROR: (questionId: string) =>
        `Error updating question with id "${questionId}".`,
    UPDATED_DATA_RETRIEVAL_ERROR: (questionId: string) =>
        `Failed to retrieve updated data for question with id  ${questionId}`,
    QUESTION_NOT_FOUND: (questionId: string) =>
        `Question with id "${questionId}" not found.`,
};
