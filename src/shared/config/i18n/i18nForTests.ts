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
        escapeValue: false,
    },
    resources: {
        en: {
            translation: {
                Мова: 'English',
                'Мова абревіатура': 'EN',
            },
            articleDetails: {
                '{{count}} перегляд': '{{count}} view',
                '{{count}} переглядів': '{{count}} views',
                '{{count}} переглядів_zero': '{{count}} views',
                '{{count}} переглядів_one': '{{count}} view',
                '{{count}} переглядів_other': '{{count}} views',
            },
        },
        uk: {
            translation: {
                Мова: 'Українська',
                'Мова абревіатура': 'УКР',
            },
            articleDetails: {
                '{{count}} переглядів_zero': '{{count}} переглядів',
                '{{count}} переглядів_one': '{{count}} перегляд',
                '{{count}} переглядів_few': '{{count}} перегляди',
                '{{count}} переглядів_many': '{{count}} переглядів',
            },
        },
    },
});

export default i18n;
