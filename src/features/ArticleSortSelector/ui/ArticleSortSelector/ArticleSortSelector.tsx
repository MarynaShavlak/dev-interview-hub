import { memo } from 'react';
import { DeprecatedArticleSortSelector } from './DeprecatedArticleSortSelector/DeprecatedArticleSortSelector';
import { RedesignedArticleSortSelector } from './RedesignedArticleSortSelector/RedesignedArticleSortSelector';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

import { ArticleSortField } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sortOrder';

export interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField | null;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedArticleSortSelector {...props} />}
            off={<DeprecatedArticleSortSelector {...props} />}
        />
    );
});
