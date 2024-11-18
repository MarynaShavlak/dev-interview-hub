import { useTranslation } from 'react-i18next';

export const useErrorText = (errorCode: string | undefined): string => {
    const { t } = useTranslation('profile');
    if (!errorCode) return '';
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return t('Зайнятий email');
        case 'auth/invalid-email':
            return t('Невалідний email');
        case 'auth/too-many-requests':
            return t('Забагато запитів');
        default:
            return t(
                'Під час реєстрації виникла помилка. Спробуйте, будь ласка, пізніше',
            );
    }
};
