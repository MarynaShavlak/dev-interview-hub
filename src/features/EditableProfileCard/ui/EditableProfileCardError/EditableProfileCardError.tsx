import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Each } from '@/shared/lib/components/Each/Each';
import { VStack } from '@/shared/ui/common/Stack';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';

import { ValidateProfileError } from '../../model/consts/consts';

interface EditableProfileCardErrorProps {
    validateErrors: ValidateProfileError[];
}

interface ErrorTextProps {
    text: string;
}

const ErrorText = memo(({ text }: ErrorTextProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <Text
                    variant="error"
                    text={text}
                    data-testid="EditableProfileCard.Error"
                />
            }
            off={
                <TextDeprecated
                    theme={TextTheme.ERROR}
                    text={text}
                    data-testid="EditableProfileCard.Error"
                />
            }
        />
    );
});

export const EditableProfileCardError = memo(
    ({ validateErrors }: EditableProfileCardErrorProps) => {
        const { t } = useTranslation('profile');

        const validateErrorTranslates = {
            [ValidateProfileError.SERVER_ERROR]: t(
                'Помилка сервера при збереженні данних',
            ),
            [ValidateProfileError.NO_DATA]: t('Дані не вказано'),
            [ValidateProfileError.INCORRECT_USER_DATA]: t(
                "Прізвище та ім'я є обов'язковими полями",
            ),
            [ValidateProfileError.INCORRECT_USERNAME]: t(
                "Ім'я користувача є обов'язковим полем",
            ),
            [ValidateProfileError.INCORRECT_AGE]: t('Некоректний формат віку'),
        };

        if (!validateErrors || !validateErrors.length) {
            return null;
        }

        return (
            <VStack gap="16">
                <Each
                    of={validateErrors}
                    render={(err) => (
                        <ErrorText text={validateErrorTranslates[err]} />
                    )}
                />
            </VStack>
        );
    },
);
