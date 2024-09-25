import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

/**
 * Initializes the i18next instance for handling internationalization (i18n) in a React application.
 * This configuration sets up i18next with the necessary plugins for language detection, backend loading of translations,
 * and integration with React through `react-i18next`.
 *
 * - **Backend**: Uses `i18next-http-backend` to load translation files from a server.
 * - **LanguageDetector**: Uses `i18next-browser-languagedetector` to detect the user's language.
 * - **initReactI18next**: Integrates i18next with React to provide translation capabilities.
 *
 * Configuration options:
 * - `fallbackLng`: Specifies the default language to use if the user's language is not available (set to 'en').
 * - `debug`: Enables debugging mode if `__IS_DEV__` is true (for development purposes).
 * - `interpolation.escapeValue`: Disables escaping of interpolated values for React (set to false).
 * - `backend.loadPath`: Defines the path for loading translation files, using the pattern `/locales/{{lng}}/{{ns}}.json`.
 *
 * @returns The configured i18next instance, ready to be used with React for internationalization.
 */

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        // debug: __IS_DEV__,
        interpolation: {
            escapeValue: false,
        },

        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
    });

export default i18n;
