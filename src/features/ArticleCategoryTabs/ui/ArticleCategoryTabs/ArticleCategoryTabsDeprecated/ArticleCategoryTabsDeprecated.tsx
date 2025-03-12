import React, { memo, useCallback, useMemo } from 'react';

import { ArticleCategory } from '@/entities/Article';
import { VStack } from '@/shared/ui/common/Stack';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { TabItem, Tabs } from '@/shared/ui/deprecated/Tabs';
import { useCategoryTabs } from '../../../lib/hooks/useCategoryTabs';
import { ArticleCategoryTabsProps } from '../ArticleCategoryTabs';

export const ArticleCategoryTabsDeprecated = memo(
    (props: ArticleCategoryTabsProps) => {
        const { className, value, onChangeCategory } = props;
        console.log('vale', value);

        const rawCategoryTabs = useCategoryTabs();
        const categoryTabs = useMemo(() => rawCategoryTabs, [rawCategoryTabs]);

        const onTabClick = useCallback(
            (tab: TabItem) => {
                onChangeCategory(tab.value as ArticleCategory);
            },
            [onChangeCategory],
        );
        return (
            <VStack gap="8" className={className}>
                <Tabs
                    tabs={categoryTabs}
                    value={value}
                    onTabClick={onTabClick}
                    className={classNames('', {}, [className])}
                />
            </VStack>
        );
    },
);
