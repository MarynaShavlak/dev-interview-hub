export const ERROR_PROFILE_CARD_MESSAGES = {
    USER_ID_REQUIRED: 'User ID is required.',
    FAILED_TO_FETCH_PROFILE: (userId: string) =>
        `Failed to retrieve user profile data for user with id ${userId}.`,
    FAILED_TO_UPDATE_PROFILE: 'An error occurred while updating user data.',
    INVALID_USER_DATA: 'User data is incorrect or incomplete.',
    SERVER_ERROR: 'A server error occurred.',
};
