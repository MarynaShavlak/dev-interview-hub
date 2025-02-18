import { memo } from 'react';
import { ArticleSortSelectorDeprecated } from './ArticleSortSelectorDeprecated/ArticleSortSelectorDeprecated';

import { ToggleFeaturesComponent } from '@/shared/lib/features';

import { SortOrder } from '@/shared/types/sortOrder';
import { ArticleSortSelectorRedesigned } from './ArticleSortSelectorRedesigned/ArticleSortSelectorRedesigned';
import { ArticleSortType } from '@/entities/Article';

export interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortType;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortType) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<ArticleSortSelectorRedesigned {...props} />}
            off={<ArticleSortSelectorDeprecated {...props} />}
        />
    );
});
