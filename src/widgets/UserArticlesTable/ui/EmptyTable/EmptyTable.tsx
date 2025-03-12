import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/common/Stack';
import { EmptyTableState } from '@/features/Table';
import { ArticleCreateNavigationButton } from '@/features/ArticleCreateNavigationButton';

export const EmptyTable = memo(() => {
    const { t } = useTranslation('articleDetails');
    return (
        <VStack gap="24" align="center">
            <EmptyTableState message={t('Не створено жодної статті')} />
            <ArticleCreateNavigationButton />
        </VStack>
    );
});
