import { useTranslation } from 'react-i18next';

// Define a union type for known error codes
export type ErrorCode =
    | 'auth/email-already-in-use'
    | 'auth/invalid-email'
    | 'auth/too-many-requests'
    | 'auth/unknown'
    | undefined;

export const useErrorText = (errorCode: ErrorCode): string => {
    const { t } = useTranslation('profile');
    if (!errorCode) return '';
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return t('Зайнятий email');
        case 'auth/invalid-email':
            return t('Невалідний email');
        case 'auth/too-many-requests':
            return t('Забагато запитів');
        case 'auth/unknown':
            return t('Невідома помилка');
        default: {
            const exhaustiveCheck: never = errorCode;
            console.warn(`Unhandled error code: ${exhaustiveCheck}`);
            return t(
                'Під час реєстрації виникла помилка. Спробуйте, будь ласка, пізніше',
            );
        }
    }
};
