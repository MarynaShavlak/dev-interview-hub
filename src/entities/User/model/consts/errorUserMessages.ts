export const ERROR_USER_MESSAGES = {
    AUTH_INIT_ERROR: 'Failed to initialize auth data.',
    DELETE_USER_ERROR: (userId: string) =>
        `Failed to delete user with id ${userId}`,
    DELETE_USER_ID_FAIL: (userId: string) =>
        `Failed to delete user with ID "${userId}".`,
    FETCH_USER_ERROR: (userId: string) =>
        `Failed to fetch user with ID "${userId}".`,
    JSON_SETTINGS_RETRIEVAL_ERROR: 'Failed to retrieve updated JSON settings',
    JSON_SETTINGS_SAVE_ERROR: 'An error occurred while saving JSON settings.',
    LOGOUT_ERROR: 'Logout failed',
    NO_USER_ID_IN_STORAGE: 'No user ID found in local storage.',
    UPDATE_USER_ERROR: (userId: string) =>
        `Error updating user with id "${userId}".`,
    UPDATED_DATA_RETRIEVAL_ERROR: (userId: string) =>
        `Failed to retrieve updated data for user ${userId}`,
    USER_AUTH_MISSING: 'User authentication data is missing.',
    USER_ID_REQUIRED: 'User ID is required.',
    USER_NOT_FOUND: (userId: string) => `User with id "${userId}" not found.`,
    USER_SNAPSHOT_FAIL: (userId: string) =>
        `Error in user with id "${userId}" snapshot.`,
    USERS_FETCH_FAIL: 'Failed to fetch comments.',
    USERS_SNAPSHOT_FAIL: `Error in users snapshot.`,
    UPDATE_USER_ROLE_FAIL: 'Failed to update user roles.',
    UPDATE_USER_ROLE_ERROR: 'An error occurred while updating user roles.',
};
