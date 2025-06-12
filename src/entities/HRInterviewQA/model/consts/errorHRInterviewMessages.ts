export const ERROR_HR_INTERVIEW_MESSAGES = {
    ADD_HR_INTERVIEW_FAIL: 'Error adding new HR interview question.',
    // ARTICLE_ID_REQUIRED: 'Article ID is required.',
    HR_INTERVIEW_NOT_FOUND: (id: string) =>
        `HR Interview QA with id "${id}" not found.`,
    HR_INTERVIEW_RETRIEVAL_FAIL:
        'Failed to retrieve created HR interview question.',
    HR_INTERVIEW_SNAPSHOT_FAIL: (id: string) =>
        `Error in HR interview QA with id "${id}" snapshot.`,
    HR_INTERVIEWS_BY_USER_ID_FETCH_FAIL: (userId: string) =>
        `Failed to fetch HR interview QAs for user with ID "${userId}".`,
    HR_INTERVIEWS_FETCH_FAIL: 'Failed to fetch HR interview questions.',
    HR_INTERVIEWS_SNAPSHOT_FAIL: 'Error in HR interview questions snapshot.',
    // AUTHOR_VIEWS_NOT_COUNTED: "Author's views are not counted",
    // DELETE_ARTICLE_ERROR: (articleId: string) =>
    //     `Failed to delete article with id ${articleId}`,
    // DELETE_BLOCK_IMAGES: 'Failed to delete article block images.',
    // DELETE_COMMENTS: 'Failed to delete article comments.',
    // DELETE_ERROR: 'Something went wrong when deleting article.',
    // DELETE_IMAGE_ERROR: 'Failed to delete image',
    // DELETE_MAIN_IMAGE: 'Failed to delete main article image.',
    // DELETE_RATINGS: 'Failed to delete article ratings.',
    // DELETE_RELATED_DATA: (id: string) =>
    //     `Failed to delete associated content for article ID "${id}".`,
    FETCH_HR_INTERVIEW_ERROR: (id: string) =>
        `Failed to fetch HR interview QA  with ID "${id}".`,
    // FILTERED_ARTICLES_FETCH_FAIL: 'Failed to fetch filtered articles.',
    // FIREBASE_STORAGE_NOT_INITIALIZED: 'Firebase storage is not initialized',
    // IMAGE_NOT_FOUND: (imagePath: string) => `Image not found: ${imagePath}`,
    // INCREMENT_VIEWS_ERROR: (articleId: string) =>
    //     `Error incrementing article views with id "${articleId}".`,
    // NO_API_DATA: 'No data received from API.',
    UPDATE_HR_INTERVIEW_ERROR: (id: string) =>
        `Error updating interview QA  with id "${id}".`,
    // UPDATE_ARTICLE_VIEWS_ERROR: 'Failed to update article views.',
    UPDATED_DATA_RETRIEVAL_ERROR: (id: string) =>
        `Failed to retrieve updated data for interview QA with id ${id}`,
    // UPLOAD_IMAGE_ERROR: 'Failed to upload image',
    USER_NOT_FOUND: 'User not found.',
};
