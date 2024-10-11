import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { VStack } from '@/shared/ui/common/Stack';
import {
    Text as TextDeprecated,
    TextSize,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';

export const StatisticsChartsError = memo(() => {
    const { t } = useTranslation('admin');
    const titleMessage = t('Помилка при завантаженні статистичних даних');
    const textMessage = t('Будь ласка, спробуйте ще раз пізніше');

    return (
        <VStack gap="16" max align="center">
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <>
                        <Text title={titleMessage} variant="error" size="l" />
                        <Text text={textMessage} size="m" variant="error" />
                    </>
                }
                off={
                    <>
                        <TextDeprecated
                            title={titleMessage}
                            theme={TextTheme.ERROR}
                            size={TextSize.L}
                        />
                        <TextDeprecated
                            text={textMessage}
                            size={TextSize.M}
                            theme={TextTheme.ERROR}
                        />
                    </>
                }
            />
        </VStack>
    );
});
