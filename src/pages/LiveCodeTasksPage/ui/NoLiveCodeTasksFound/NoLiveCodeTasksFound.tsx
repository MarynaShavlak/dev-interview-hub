import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { HStack } from '@/shared/ui/common/Stack';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';

export const NoLiveCodeTasksFound = memo(() => {
    const { t } = useTranslation('articles');
    const message = t('Завдань не знайдено');

    return (
        <HStack gap="16" justify="center" align="center">
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<Text size="m" title={message} />}
                off={<TextDeprecated size={TextSize.L} title={message} />}
            />
        </HStack>
    );
});
