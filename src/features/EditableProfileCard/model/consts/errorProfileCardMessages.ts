export const ERROR_PROFILE_CARD_MESSAGES = {
    FAILED_TO_FETCH_PROFILE: (userId: string) =>
        `Failed to retrieve user profile data for user with id ${userId}.`,
    FAILED_TO_UPDATE_PROFILE: 'An error occurred while updating user data.',
    FIREBASE_STORAGE_NOT_INITIALIZED: 'Firebase storage is not initialized',
    INVALID_USER_DATA: 'User data is incorrect or incomplete.',
    UPLOAD_IMAGE_ERROR: 'Failed to upload image',
    USER_ID_REQUIRED: 'User ID is required.',
};
