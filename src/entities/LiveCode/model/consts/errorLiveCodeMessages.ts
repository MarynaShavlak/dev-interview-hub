export const ERROR_LIVE_CODE_MESSAGES = {
    ADD_LIVE_CODE_FAIL: 'Error adding new live code question.',
    LIVE_CODE_ID_REQUIRED: 'live code task ID is required.',
    LIVE_CODE_NOT_FOUND: (id: string) =>
        `Live code task with id "${id}" not found.`,
    LIVE_CODE_RETRIEVAL_FAIL: 'Failed to retrieve created live code question.',
    LIVE_CODE_SNAPSHOT_FAIL: (id: string) =>
        `Error in live code task with id "${id}" snapshot.`,
    LIVE_CODES_BY_USER_ID_FETCH_FAIL: (userId: string) =>
        `Failed to fetch live code tasks for user with ID "${userId}".`,
    LIVE_CODES_FETCH_FAIL: 'Failed to fetch live code questions.',
    LIVE_CODES_SNAPSHOT_FAIL: 'Error in live code questions snapshot.',
    DELETE_LIVE_CODE_ERROR: (id: string) =>
        `Failed to delete live code task with id ${id}`,

    DELETE_ERROR: 'Something went wrong when deleting live code questions.',
    FETCH_LIVE_CODE_ERROR: (id: string) =>
        `Failed to fetch live code task  with ID "${id}".`,
    // FILTERED_ARTICLES_FETCH_FAIL: 'Failed to fetch filtered articles.',
    UPDATE_LIVE_CODE_ERROR: (id: string) =>
        `Error updating interview task  with id "${id}".`,
    UPDATED_DATA_RETRIEVAL_ERROR: (id: string) =>
        `Failed to retrieve updated data for live cde question  with id ${id}`,

    USER_NOT_FOUND: 'User not found.',
};
