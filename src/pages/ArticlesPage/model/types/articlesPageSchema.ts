import { EntityState } from '@reduxjs/toolkit';
import {
    Article,
    ArticleSortField,
    ArticleCategory,
    ArticleView,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types/sortOrder';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;

    // pagination
    page: number;
    limit: number;
    hasMore: boolean;
    // filters
    view: ArticleView;
    order: SortOrder;
    sort: ArticleSortField;
    search: string;
    category: ArticleCategory;

    _inited: boolean;
}
