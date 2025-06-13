import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { VStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import cls from './SaveArticleError.module.scss';
import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';

export const SaveHRInterviewQAError = memo(() => {
    const { t } = useTranslation('articleDetails');
    const text = t('Помилка сервера при збереженні данних');

    const wrapClass = toggleFeatures({
        name: 'isAppRedesigned',
        off: () => cls.errorWrapperDeprecated,
        on: () => cls.errorWrapperRedesigned,
    });

    return (
        <VStack gap="24" align="center" max className={wrapClass}>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<Text text={text} />}
                off={<TextDeprecated text={text} theme={TextTheme.ERROR} />}
            />
        </VStack>
    );
});
