export const ERROR_NOTIFICATION_MESSAGES = {
    DELETE_ALL_GENERAL_FAIL: 'Failed to delete all general notifications.',
    DELETE_ALL_PERSONAL_FAIL: 'Failed to delete all personal notifications.',
    DELETE_NOTIFICATION_FAIL: (id: string) =>
        `Failed to dismiss notification with ID "${id}".`,
    DELETE_NOTIFICATIONS_FAIL:
        'Failed to delete notifications for the current user.',
    DISMISS_GENERAL_FAIL: (id: string) =>
        `Failed to dismiss general notification with ID "${id}".`,
    DISMISS_PERSONAL_FAIL: (id: string) =>
        `Failed to dismiss personal notification with ID "${id}".`,
    NOTIFICATION_ID_REQUIRED: 'Notification ID is required.',
    NOTIFICATION_NOT_FOUND: 'Notification not found.',
    NOTIFICATIONS_FETCH_FAIL: 'Failed to fetch notifications.',
    NO_PERSONAL_NOTIFICATIONS: 'No personal notifications found for the user.',
    PERSONAL_NOTIFICATION_NOT_FOUND: 'Personal notification not found.',
    SUBSCRIPTIONS_ERROR: 'Error in all notifications subscription.',
    USER_NOT_AUTHORIZED: 'User not authenticated',
};
