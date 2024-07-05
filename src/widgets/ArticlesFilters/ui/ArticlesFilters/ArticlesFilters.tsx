import { memo } from 'react';
import { DeprecatedArticlesFilters } from './DeprecatedArticlesFilters/DeprecatedArticlesFilters';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { RedesignedArticlesFilters } from './RedesignedArticlesFilters/RedesignedArticlesFilters';
import { ArticleSortField, ArticleCategory } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sortOrder';

export interface ArticlesFiltersProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    category: ArticleCategory;
    search: string;
    onChangeSearch: (value: string) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
    onChangeCategory: (type: ArticleCategory) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedArticlesFilters {...props} />}
            off={<DeprecatedArticlesFilters {...props} />}
        />
    );
});
