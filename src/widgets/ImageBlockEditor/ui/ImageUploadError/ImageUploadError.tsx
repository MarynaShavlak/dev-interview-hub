import { useTranslation } from 'react-i18next';
import React from 'react';
import { VStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

interface ImageUploadErrorProps {
    onRetry: () => void;
}

export const ImageUploadError = ({ onRetry }: ImageUploadErrorProps) => {
    const { t } = useTranslation('articleDetails');
    const text = t('Помилка завантаження файлу');
    const buttonText = t('Спробувати повторно');

    return (
        <VStack gap="24" align="center" max>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<Text variant="error" text={text} />}
                off={<TextDeprecated theme={TextTheme.ERROR} text={text} />}
            />
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<Button onClick={onRetry}>{buttonText}</Button>}
                off={
                    <ButtonDeprecated onClick={onRetry}>
                        {buttonText}
                    </ButtonDeprecated>
                }
            />
        </VStack>
    );
};
