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
                'Текст підтвердження': 'Are you sure you want to delete',
                'Текст попередження': 'This action cannot be undone.',
                'Незбережені зміни': 'You have unsaved changes',
                'Текст відміни': 'Are you sure you want to cancel',
            },
            articleDetails: {
                '{{count}} перегляд': '{{count}} view',
                '{{count}} переглядів': '{{count}} views',
                '{{count}} переглядів_zero': '{{count}} views',
                '{{count}} переглядів_one': '{{count}} view',
                '{{count}} переглядів_other': '{{count}} views',
                'Заголовок блоку': 'Block title( optional)',
                'Опис коду': 'Code description ( optional)',
            },
            profile: {
                'Відновлення паролю': 'Recover Password',
                'Вкажіть адресу':
                    "Enter the email address you used to register and we'll send you the instruction",
                'Скинути пароль': 'Reset password',
                "Я пам'ятаю пароль": 'I remember password',
                'Помилка відновлення паролю':
                    'Password recovery error. Please try again later.',
                'Лист {{email}} відновлення паролю':
                    'If account {{email}} exist, an email will be sent with further instructions',
            },
        },

        uk: {
            translation: {
                Мова: 'Українська',
                'Мова абревіатура': 'УКР',
                'Текст підтвердження': 'Ви впевнені, що хочете видалити',
                'Текст попередження': 'Цю дію неможливо скасувати.',
                'Незбережені зміни': 'У вас є незбережені зміни.',
                'Текст відміни': 'Ви впевнені, що хочете скасувати',
            },
            articleDetails: {
                '{{count}} переглядів_zero': '{{count}} переглядів',
                '{{count}} переглядів_one': '{{count}} перегляд',
                '{{count}} переглядів_few': '{{count}} перегляди',
                '{{count}} переглядів_many': '{{count}} переглядів',
                'Заголовок блоку': "Заголовок блоку (необов'язкове)",
                'Опис коду': "Опис коду (необов'язкове)",
            },
            profile: {
                'Відновлення паролю': 'Відновлення паролю',
                'Вкажіть адресу':
                    'Введіть адресу електронної пошти, яку Ви використовували для реєстрації, і ми надішлемо Вам інструкції.',
                'Скинути пароль': 'Скинути пароль',
                "Я пам'ятаю пароль": "Я пам'ятаю пароль",
                'Помилка відновлення паролю':
                    'Помилка відновлення паролю. Будь ласка, спробуйте ще раз пізніше',
                'Лист {{email}} відновлення паролю':
                    'Якщо обліковий запис {{email}} існує, на електронну пошту буде надіслано лист з подальшими інструкціями.',
            },
        },
    },
});

export default i18n;
