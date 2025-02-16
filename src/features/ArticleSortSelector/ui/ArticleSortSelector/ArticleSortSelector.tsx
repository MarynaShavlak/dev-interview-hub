import { memo } from 'react';
import { ArticleSortSelectorDeprecated } from './ArticleSortSelectorDeprecated/ArticleSortSelectorDeprecated';

import { ToggleFeaturesComponent } from '@/shared/lib/features';

import { ArticleSortField } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sortOrder';
import { ArticleSortSelectorRedesigned } from './ArticleSortSelectorRedesigned/ArticleSortSelectorRedesigned';

export interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
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
