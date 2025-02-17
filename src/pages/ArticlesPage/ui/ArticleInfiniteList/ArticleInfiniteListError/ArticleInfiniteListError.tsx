import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text } from '@/shared/ui/redesigned/Text';
import {
    Text as TextDeprecated,
    TextAlign,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { VStack } from '@/shared/ui/common/Stack';

export const ArticleInfiniteListError = memo(() => {
    const { t } = useTranslation('articles');
    const errorMessage = t('Помилка запиту статей');

    return (
        <VStack gap="16" justify="center" align="center" max>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<Text text={errorMessage} align="center" variant="error" />}
                off={
                    <TextDeprecated
                        text={errorMessage}
                        align={TextAlign.CENTER}
                        theme={TextTheme.ERROR}
                    />
                }
            />
        </VStack>
    );
});
