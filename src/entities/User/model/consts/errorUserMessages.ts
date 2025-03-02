export const ERROR_USER_MESSAGES = {
    USER_AUTH_MISSING: 'User authentication data is missing.',
    USERS_FETCH_FAIL: 'Failed to fetch comments.',
    FETCH_USER_ERROR: (userId: string) =>
        `Failed to fetch user with ID "${userId}".`,
    USER_SNAPSHOT_FAIL: (userId: string) =>
        `Error in ser with id "${userId}" snapshot.`,
    USERS_SNAPSHOT_FAIL: `Error in users snapshot.`,
    USER_NOT_FOUND: (userId: string) => `User with id "${userId}" not found.`,
    DELETE_USER_ID_FAIL: (userId: string) =>
        `Failed to delete user with ID "${userId}".`,
    UPDATE_USER_ERROR: (userId: string) =>
        `Error updating user with id "${userId}".`,

    UPDATED_DATA_RETRIEVAL_ERROR: (userId: string) =>
        `Failed to retrieve updated data for user ${userId}`,
    JSON_SETTINGS_RETRIEVAL_ERROR: 'Failed to retrieve updated JSON settings',
    JSON_SETTINGS_SAVE_ERROR: 'An error occurred while saving JSON settings.',
    LOGOUT_ERROR: 'Logout failed',
    NO_USER_ID_IN_STORAGE: 'No user ID found in local storage.',
    AUTH_INIT_ERROR: 'Failed to initialize auth data.',
};
