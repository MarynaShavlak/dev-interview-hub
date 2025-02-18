import { memo } from 'react';
import { ArticlesFiltersDeprecated } from './ArticlesFiltersDeprecated/ArticlesFiltersDeprecated';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticlesFiltersRedesigned } from './ArticlesFiltersRedesigned/ArticlesFiltersRedesigned';
import {
    ArticleSortField,
    ArticleCategory,
    ArticleSort,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types/sortOrder';

export interface ArticlesFiltersProps {
    className?: string;
    sort: ArticleSortField | ArticleSort;
    order: SortOrder;
    category: ArticleCategory;
    search: string;
    limit: number;
    onChangeSearch: (value: string) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField | ArticleSort) => void;
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
