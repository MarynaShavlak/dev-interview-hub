export const ERROR_MESSAGES = {
    MISSING_ARTICLE: 'Article data is required.',
    DELETE_FAIL: (id: string) => `Failed to delete  article with ID "${id}".`,
    DELETE_BLOCK_IMAGES: 'Failed to delete article block images.',
    DELETE_MAIN_IMAGE: 'Failed to delete main article image.',
    DELETE_ERROR: 'Something when wrong when deleting article images.',
    DELETE_COMMENTS: 'Failed to delete article comments.',
    DELETE_RATINGS: 'Failed to delete article ratings.',
    DELETE_RELATED_DATA: (id: string) =>
        `Failed to delete associated content for article ID "${id}".`,
};
