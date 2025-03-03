export const ERROR_ARTICLE_MESSAGES = {
    ADD_ARTICLE_FAIL: 'Error adding new article.',
    ARTICLE_ID_REQUIRED: 'Article ID is required.',
    ARTICLE_NOT_FOUND: (articleId: string) =>
        `Article with id "${articleId}" not found.`,
    ARTICLE_RETRIEVAL_FAIL: 'Failed to retrieve created article.',
    ARTICLE_SNAPSHOT_FAIL: (articleId: string) =>
        `Error in article with id "${articleId}" snapshot.`,
    ARTICLES_BY_USER_ID_FETCH_FAIL: (userId: string) =>
        `Failed to fetch articles for user with ID "${userId}".`,
    ARTICLES_FETCH_FAIL: 'Failed to fetch articles.',
    ARTICLES_SNAPSHOT_FAIL: 'Error in articles snapshot.',
    AUTHOR_VIEWS_NOT_COUNTED: "Author's views are not counted",
    DELETE_ARTICLE_ERROR: (articleId: string) =>
        `Failed to delete article with id ${articleId}`,
    DELETE_BLOCK_IMAGES: 'Failed to delete article block images.',
    DELETE_COMMENTS: 'Failed to delete article comments.',
    DELETE_ERROR: 'Something went wrong when deleting article.',
    DELETE_IMAGE_ERROR: 'Failed to delete image',
    DELETE_MAIN_IMAGE: 'Failed to delete main article image.',
    DELETE_RATINGS: 'Failed to delete article ratings.',
    DELETE_RELATED_DATA: (id: string) =>
        `Failed to delete associated content for article ID "${id}".`,
    FETCH_ARTICLE_ERROR: (articleId: string) =>
        `Failed to fetch article with ID "${articleId}".`,
    FILTERED_ARTICLES_FETCH_FAIL: 'Failed to fetch filtered articles.',
    FIREBASE_STORAGE_NOT_INITIALIZED: 'Firebase storage is not initialized',
    IMAGE_NOT_FOUND: (imagePath: string) => `Image not found: ${imagePath}`,
    INCREMENT_VIEWS_ERROR: (articleId: string) =>
        `Error incrementing article views with id "${articleId}".`,
    NO_API_DATA: 'No data received from API.',
    UPDATE_ARTICLE_ERROR: (articleId: string) =>
        `Error updating article with id "${articleId}".`,
    UPDATE_ARTICLE_VIEWS_ERROR: 'Failed to update article views.',
    UPDATED_DATA_RETRIEVAL_ERROR: (articleId: string) =>
        `Failed to retrieve updated data for article with id ${articleId}`,
    UPLOAD_IMAGE_ERROR: 'Failed to upload image',
    USER_NOT_FOUND: 'User not found.',
};
