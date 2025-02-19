import { ArticleSortField, ArticleSortType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sortOrder';

export const createAlgoliaIndexNameFromUrl = (
    sort: ArticleSortType,
    order: SortOrder,
) => {
    return `articles_${sort}_${order}` as ArticleSortField;
};
