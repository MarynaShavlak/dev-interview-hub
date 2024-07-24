/**
 * The `Theme` enum defines the different themes available in the application.
 * It provides a set of constants that represent the various themes that can be applied.
 * This is useful for maintaining consistency in theme naming and usage throughout the application.
 *
 * @enum {string}
 * @property {string} LIGHT - Represents the light theme of the application. Typically used for a brighter, more traditional appearance.
 * @property {string} DARK - Represents the dark theme of the application. Usually used for a dimmer, more modern look, reducing eye strain in low-light environments.
 * @property {string} ORANGE - Represents the orange theme of the application. Offers a vibrant, high-contrast appearance with orange as the primary color.
 */

export enum Theme {
    LIGHT = 'app_light_theme',
    DARK = 'app_dark_theme',
    ORANGE = 'app_orange_theme',
}
