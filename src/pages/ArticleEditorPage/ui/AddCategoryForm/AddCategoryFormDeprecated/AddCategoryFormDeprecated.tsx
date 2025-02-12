import React, { memo, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from '@/shared/ui/deprecated/Tabs';
import { OrderCard } from '@/shared/ui/deprecated/OrderCard';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/deprecated/Text';

import { useCategoryTabs } from '@/features/ArticleCategoryTabs';

import { ArticleCategory } from '@/entities/Article';
import { AddCategoryFormProps } from '../AddCategoryForm';
import { useArticleFormState } from '../../../lib/hooks/useArticleFormState/useArticleFormState';

export const AddCategoryFormDeprecated = memo((props: AddCategoryFormProps) => {
    const { t } = useTranslation('articleDetails');
    const { index } = props;
    const { formData, onChangeCategory } = useArticleFormState();
    const rawCategoryTabs = useCategoryTabs();
    const categoryTabs = useMemo(() => rawCategoryTabs, [rawCategoryTabs]);

    useEffect(() => {
        if (!formData?.category?.length && categoryTabs.length > 0) {
            onChangeCategory(categoryTabs[0].value);
        }
    }, [formData?.category, categoryTabs, onChangeCategory]);

    return (
        <HStack gap="16" align="start" max>
            <OrderCard index={index} />
            <VStack gap="16">
                <Text title={t('Категорії статей')} />
                <Text text={t('Оберіть категорію')} />
                <Tabs
                    tabs={categoryTabs}
                    value={formData?.category as ArticleCategory[]}
                    onTabClick={(tab) => {
                        onChangeCategory(tab.value);
                    }}
                />
            </VStack>
        </HStack>
    );
});
