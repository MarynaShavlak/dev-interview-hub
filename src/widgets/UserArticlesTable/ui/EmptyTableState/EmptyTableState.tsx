import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleCreateNavigationButton } from '@/features/ArticleCreateNavigationButton';

export const EmptyTableState = memo(() => {
    const { t } = useTranslation('articleDetails');

    return (
        <VStack gap="16" max align="center">
            <Text text={t('Не створено жодної статті')} />
            <ArticleCreateNavigationButton />
        </VStack>
    );
});
