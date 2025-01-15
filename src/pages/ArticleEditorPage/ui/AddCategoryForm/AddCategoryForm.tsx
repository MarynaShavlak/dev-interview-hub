import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from '@/shared/ui/redesigned/Tabs';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { useArticleEditorState } from '../../lib/hooks/useArticleEditorState/useArticleEditorState';
import { useCategoryTabs } from '@/features/ArticleCategoryTabs';

import { ArticleCategory } from '@/entities/Article';

interface AddCategoryFormProps {
    index: number;
}

export const AddCategoryForm = (props: AddCategoryFormProps) => {
    const { t } = useTranslation('articleDetails');
    const { index } = props;
    const { formData, onChangeCategory } = useArticleEditorState();
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
                <Text text={t('Категорії статей')} bold />
                <Text text={t('Оберіть категорію')} italic />
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
};
