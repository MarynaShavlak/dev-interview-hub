export const ERROR_MESSAGES = {
    ARTICLE_NOT_FOUND: 'Article not found.',
    COMMENTS_FETCH_FAIL: 'Failed to fetch comments.',
    COMMENTS_BY_ARTICLE_ID_FETCH_FAIL: (articleId: string) =>
        `Failed to fetch comments for article with ID "${articleId}".`,
    COMMENTS_BY_ARTICLE_IDS_FETCH_FAIL: (articleIds: string[]) =>
        `Failed to fetch comments for the given article IDs: "${articleIds.join(',')}"."`,
    COMMENTS_SNAPSHOT_FAIL: 'Error in comments snapshot.',
    ADD_COMMENT_FAIL: 'Error adding new comment.',
    COMMENT_RETRIEVAL_FAIL: 'Failed to retrieve created comment.',
    DELETE_COMMENTS_BY_ARTICLE_ID_FAIL: (articleId: string) =>
        `Failed to delete comments for article with ID "${articleId}".`,
    DELETE_ERROR: 'Something when wrong when deleting comment.',
};
