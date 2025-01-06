import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '../../Text';
import {
    InputValidations,
    ValidationErrors,
} from '@/shared/lib/hooks/validationHooks/useInputErrors/useInputErrors';

interface ValidationErrorMessagesProps {
    isDirty: boolean;
    value?: string | number;
    validations?: InputValidations;
    errors: ValidationErrors;
}

export const ValidationErrorMessages = memo(
    ({ isDirty, value, validations, errors }: ValidationErrorMessagesProps) => {
        const { t } = useTranslation();

        const validationMessages = useMemo(
            () => ({
                EMPTY_FIELD: t('Поле є обов’язковим для заповнення'),
                INVALID_EMAIL: t('Невірний формат електронної пошти'),
                MIN_LENGTH_VIOLATION: t(
                    'Мінімальна довжина поля не відповідає вимогам',
                ),
                MAX_LENGTH_VIOLATION: t('Максимальна довжина поля перевищена'),
                INVALID_USERNAME: t("Неправильне ім'я користувача"),
                INVALID_URL: t('Невірний формат URL'),
            }),
            [t],
        );
        if (!isDirty) return null;
        return (
            <>
                {errors.isEmpty && (
                    <Text
                        size="s"
                        variant="error"
                        text={validationMessages.EMPTY_FIELD}
                    />
                )}
                {!errors.isEmpty && errors.minLengthError && (
                    <Text
                        size="s"
                        variant="error"
                        text={validationMessages.MIN_LENGTH_VIOLATION}
                    />
                )}
                {errors.maxLengthError && (
                    <Text
                        size="s"
                        variant="error"
                        text={validationMessages.MAX_LENGTH_VIOLATION}
                    />
                )}
                {!errors.isEmpty && errors.emailError && (
                    <Text
                        size="s"
                        variant="error"
                        text={validationMessages.INVALID_EMAIL}
                    />
                )}
                {!errors.isEmpty && errors.usernameError && (
                    <Text
                        size="s"
                        variant="error"
                        text={validationMessages.INVALID_USERNAME}
                    />
                )}
                {errors.isUrlError && (
                    <Text
                        size="s"
                        variant="error"
                        text={validationMessages.INVALID_URL}
                    />
                )}
            </>
        );
    },
);
