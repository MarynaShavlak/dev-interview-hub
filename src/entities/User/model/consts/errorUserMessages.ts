export const ERROR_USER_MESSAGES = {
    FETCH_USER_ERROR: (userId: string) =>
        `Failed to fetch user with ID "${userId}".`,
    USER_SNAPSHOT_FAIL: (userId: string) =>
        `Error in ser with id "${userId}" snapshot.`,

    USER_NOT_FOUND: 'User not found.',
    DELETE_USER_ERROR: 'Error deleting user from Firestore.',
    UPDATE_USER_ERROR: 'Error updating user data.',
    GENERIC_ERROR: 'Something went wrong with users.',
};
