import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';

import { ValidateProfileError } from '../../model/consts/consts';

interface EditableProfileCardErrorProps {
    validateErrors: ValidateProfileError[];
}

interface ErrorProps {
    err: string;
    text: string;
}

const DeprecatedError = ({ err, text }: ErrorProps) => {
    return (
        <TextDeprecated
            key={err}
            theme={TextTheme.ERROR}
            text={text}
            data-testid="EditableProfileCard.Error"
        />
    );
};

const RedesignedError = ({ err, text }: ErrorProps) => {
    return (
        <Text
            key={err}
            variant="error"
            text={text}
            data-testid="EditableProfileCard.Error"
        />
    );
};

export const EditableProfileCardError = memo(
    ({ validateErrors }: EditableProfileCardErrorProps) => {
        const { t } = useTranslation('profile');

        const validateErrorTranslates = {
            [ValidateProfileError.SERVER_ERROR]: t(
                'Помилка сервера при збереженні даннних',
            ),
            [ValidateProfileError.INCORRECT_COUNTRY]: t('Некоректний регіон'),
            [ValidateProfileError.NO_DATA]: t('Дані не вказано'),
            [ValidateProfileError.INCORRECT_USER_DATA]: t(
                "Прізвище та ім'я є обов'язковими полями",
            ),
            [ValidateProfileError.INCORRECT_AGE]: t('Некоректний формат віку'),
        };

        if (!validateErrors || !validateErrors.length) {
            return null;
        }

        return (
            <VStack gap="16">
                {validateErrors.map((err) => {
                    const text = validateErrorTranslates[err];
                    return (
                        <ToggleFeaturesComponent
                            feature="isAppRedesigned"
                            on={<RedesignedError err={err} text={text} />}
                            off={<DeprecatedError err={err} text={text} />}
                        />
                    );
                })}
            </VStack>
        );
    },
);
