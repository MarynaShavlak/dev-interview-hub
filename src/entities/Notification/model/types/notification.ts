/**
 * Interface representing a notification item.
 *
 * @property {string} id - A unique identifier for the notification.
 * @property {string} title - The title of the notification.
 * @property {string} description - The detailed description or content of the notification.
 * @property {string} [href] - An optional URL that the notification can link to. If provided, the notification may include a link for additional actions.
 */

export interface Notification {
    id: string;
    title: string;
    message: string;
    href: string | null;
    timestamp: string;
    type: 'general' | 'personal';
    dismissedBy: string[];
}
