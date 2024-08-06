import { Theme } from '@/shared/const/theme';

/**
 * Interface representing JSON settings for a user.
 *
 * @property {Theme} [theme] - The user's preferred theme. Optional.
 * @property {boolean} [isFirstVisit] - Indicates if this is the user's first visit. Optional.
 * @property {boolean} [settingsPageHasBeenOpen] - Indicates if the settings page has been opened by the user. Optional.
 * @property {boolean} [isArticlesPageWasOpened] - Indicates if the articles page has been opened by the user. Optional.
 */

export interface JsonSettings {
    theme?: Theme;
    isFirstVisit?: boolean;
    settingsPageHasBeenOpen?: boolean;
    isArticlesPageWasOpened?: boolean;
}
