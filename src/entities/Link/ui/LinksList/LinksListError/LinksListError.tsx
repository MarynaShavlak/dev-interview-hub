import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/common/Stack';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';

export const LinksListError = memo(({ className }: { className?: string }) => {
    const { t } = useTranslation('articles');

    const errorMessage = t(
        'Не вдалося завантажити посилання. Спробуйте ще раз пізніше.',
    );
    return (
        <VStack gap="16" max className={className} align="center">
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<Text text={errorMessage} variant="error" />}
                off={
                    <TextDeprecated
                        text={errorMessage}
                        theme={TextTheme.ERROR}
                    />
                }
            />
        </VStack>
    );
});
