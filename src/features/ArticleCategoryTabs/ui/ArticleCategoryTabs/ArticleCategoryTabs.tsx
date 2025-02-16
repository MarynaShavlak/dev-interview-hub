import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleCategory } from '@/entities/Article';
import { ArticleCategoryTabsRedesigned } from './ArticleCategoryTabsRedesigned/ArticleCategoryTabsRedesigned';
import { ArticleCategoryTabsDeprecated } from './ArticleCategoryTabsDeprecated/ArticleCategoryTabsDeprecated';

export interface ArticleCategoryTabsProps {
    className?: string;
    value: ArticleCategory;
    onChangeCategory: (category: ArticleCategory) => void;
}

export const ArticleCategoryTabs = memo((props: ArticleCategoryTabsProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<ArticleCategoryTabsRedesigned />}
            off={<ArticleCategoryTabsDeprecated {...props} />}
        />
    );
});
