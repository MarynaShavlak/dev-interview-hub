export const ERROR_LINK_MESSAGES = {
    ADD_LINK_FAIL: 'Error adding new link.',

    USER_NOT_FOUND: 'User not found.',
    LINK_ADD_API_FAIL: 'No data received from API.',
    LINK_ID_REQUIRED: 'Link ID is required.',
    LINK_RETRIEVAL_FAIL: 'Failed to retrieve created link.',
    LINK_TEXT_REQUIRED: 'Link text cannot be empty.',
    LINK_LABEL_REQUIRED: 'Link label cannot be empty.',
    LINKS_BY_USER_ID_FETCH_FAIL: (userId: string) =>
        `Failed to fetch links for user with ID "${userId}".`,

    LINKS_SNAPSHOT_FAIL: 'Error in links snapshot.',

    DELETE_ERROR: 'Something went wrong when deleting link.',
    USER_AUTH_MISSING: 'User authentication data is missing.',
    UPDATE_LINK_ERROR: (linkId: string) =>
        `Error updating link with id "${linkId}".`,
    UPDATED_DATA_RETRIEVAL_ERROR: (linkId: string) =>
        `Failed to retrieve updated data for link with id  ${linkId}`,
    LINK_NOT_FOUND: (linkId: string) => `Link with id "${linkId}" not found.`,
};
