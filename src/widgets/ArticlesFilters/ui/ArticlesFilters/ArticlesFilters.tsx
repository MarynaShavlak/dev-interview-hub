import { memo } from 'react';
import { ArticlesFiltersDeprecated } from './ArticlesFiltersDeprecated/ArticlesFiltersDeprecated';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticlesFiltersRedesigned } from './ArticlesFiltersRedesigned/ArticlesFiltersRedesigned';
import { ArticleCategory, ArticleSortType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sortOrder';

export interface ArticlesFiltersProps {
    className?: string;
    sort: ArticleSortType;
    order: SortOrder;
    category: ArticleCategory;
    search: string;
    limit: number;
    onChangeSearch: (value: string) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortType) => void;
    onChangeCategory: (category: ArticleCategory) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<ArticlesFiltersRedesigned {...props} />}
            off={<ArticlesFiltersDeprecated {...props} />}
        />
    );
});
