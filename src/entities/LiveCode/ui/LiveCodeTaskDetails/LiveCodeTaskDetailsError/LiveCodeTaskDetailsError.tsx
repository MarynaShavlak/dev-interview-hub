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
import cls from '../LiveCodeTaskDetails.module.scss';

export const LiveCodeTaskDetailsError = memo(() => {
    const { t } = useTranslation('articleDetails');
    const titleMessage = t('Стаття не доступна');
    const textMessage = t(
        // eslint-disable-next-line max-len
        'Можливо, статтю, яку ви шукаєте, видалено або вона не існує. Будь ласка, перевірте правильність URL-адреси або поверніться на головну сторінку ',
    );

    return (
        <VStack gap="16" max className={cls.ArticleDetails}>
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
