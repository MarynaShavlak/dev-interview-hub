export const ERROR_USER_MESSAGES = {
    FETCH_USER_ERROR: (userId: string) =>
        `Failed to fetch user with ID "${userId}".`,
    USER_SNAPSHOT_FAIL: (userId: string) =>
        `Error in ser with id "${userId}" snapshot.`,

    USER_NOT_FOUND: (userId: string) => `User with id "${userId}" not found.`,
    DELETE_USER_ID_FAIL: (userId: string) =>
        `Failed to delete user with ID "${userId}".`,
    UPDATE_USER_ERROR: (userId: string) =>
        `Error updating user with id "${userId}".`,

    UPDATED_DATA_RETRIEVAL_ERROR: (userId: string) =>
        `Failed to retrieve updated data for user ${userId}`,
};
