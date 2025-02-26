/**
 * Interface representing a notification item.
 *
 * @property {string} id - A unique identifier for the notification.
 * @property {string} title - The title of the notification.
 * @property {string} description - The detailed description or content of the notification.
 * @property {string} [href] - An optional URL that the notification can link to. If provided, the notification may include a link for additional actions.
 */

export type NotificationType =
    | 'general'
    | 'personal_comment'
    | 'personal_rating';

export interface PersonalNotification {
    id: string;
    localizationTitle: {
        en: string;
        uk: string;
    };
    localizationMessage: {
        en: string;
        uk: string;
    };
    href: string | null;
    timestamp: string;
    type: NotificationType;
}

export interface GeneralNotification extends PersonalNotification {
    dismissedBy: string[];
}

export type Notification = GeneralNotification | PersonalNotification;
