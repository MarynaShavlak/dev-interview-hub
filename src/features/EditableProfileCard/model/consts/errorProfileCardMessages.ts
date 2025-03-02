export const ERROR_PROFILE_CARD_MESSAGES = {
    USER_ID_REQUIRED: 'User ID is required.',
    FAILED_TO_FETCH_PROFILE: (userId: string) =>
        `Failed to retrieve user profile data for user with id ${userId}.`,
    FAILED_TO_UPDATE_PROFILE: 'An error occurred while updating user data.',
    INVALID_USER_DATA: 'User data is incorrect or incomplete.',
    UPDATE_PROFILE_ERROR: (userId: string) =>
        `Error updating profile for user with id "${userId}".`,
};
