export const ERROR_ARTICLE_MESSAGES = {
    DELETE_ARTICLE_ERROR: (articleId: string) =>
        `Failed to delete article with id ${articleId}`,
    ARTICLE_RETRIEVAL_FAIL: 'Failed to retrieve created article.',
    ADD_ARTICLE_FAIL: 'Error adding new article.',
    ARTICLE_NOT_FOUND: (articleId: string) =>
        `Article with id "${articleId}" not found.`,
    UPDATE_ARTICLE_ERROR: (articleId: string) =>
        `Error updating article with id "${articleId}".`,
    UPDATED_DATA_RETRIEVAL_ERROR: (articleId: string) =>
        `Failed to retrieve updated data for article with id ${articleId}`,
};
