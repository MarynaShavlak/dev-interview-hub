import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { VStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './SaveArticleError.module.scss';

export const SaveArticleError = memo(() => {
    const { t } = useTranslation('articleDetails');

    return (
        <VStack gap="24" align="center" max className={cls.errorWrapper}>
            <Text
                // variant="error"
                text={t('Помилка сервера при збереженні данних')}
            />
        </VStack>
    );
});
