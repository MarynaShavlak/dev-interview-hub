import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

/**
 * The `i18nForTests` module configures and initializes the i18next library for internationalization in tests.
 * It sets up the i18n instance with a Ukrainian language (`'uk'`) configuration, ensuring that translations
 * are available during testing. This setup helps maintain consistent language handling and allows tests to
 * focus on functionality without dealing with translation issues.
 *
 * @module
 * @returns The configured i18n instance with Ukrainian as the default language.
 */

i18n.use(initReactI18next).init({
    lng: 'uk',
    fallbackLng: 'uk',
    debug: false,

    interpolation: {
        escapeValue: false, // not needed for react!!
    },
    resources: { uk: { translations: {} } },
});

export default i18n;
