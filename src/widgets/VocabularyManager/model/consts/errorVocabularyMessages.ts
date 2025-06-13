export const ERROR_VOCABULARY_MESSAGES = {
    ADD_VOCABULARY_FAIL: 'Error adding new vocabulary.',

    USER_NOT_FOUND: 'User not found.',
    VOCABULARY_ADD_API_FAIL: 'No data received from API.',
    VOCABULARY_ID_REQUIRED: 'Vocabulary ID is required.',
    VOCABULARY_RETRIEVAL_FAIL: 'Failed to retrieve created vocabulary.',
    VOCABULARY_TEXT_REQUIRED: 'Vocabulary text cannot be empty.',
    VOCABULARY_LABEL_REQUIRED: 'Vocabulary label cannot be empty.',
    VOCABULARY_BY_USER_ID_FETCH_FAIL: (userId: string) =>
        `Failed to fetch vocabularies for user with ID "${userId}".`,

    VOCABULARY_SNAPSHOT_FAIL: 'Error in vocabularies snapshot.',

    DELETE_ERROR: 'Something went wrong when deleting vocabulary.',
    USER_AUTH_MISSING: 'User authentication data is missing.',
    UPDATE_VOCABULARY_ERROR: (vocabularyId: string) =>
        `Error updating vocabulary with id "${vocabularyId}".`,
    UPDATED_DATA_RETRIEVAL_ERROR: (vocabularyId: string) =>
        `Failed to retrieve updated data for vocabulary with id  ${vocabularyId}`,
    VOCABULARY_NOT_FOUND: (vocabularyId: string) =>
        `Vocabulary with id "${vocabularyId}" not found.`,
};
