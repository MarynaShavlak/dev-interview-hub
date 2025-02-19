import { SortOrder } from '@/shared/types/sortOrder';
import { ArticleCategory, ArticleSortType } from '@/entities/Article';
import { extractCategory } from '../extractCategory/extractCategory';
import { extractSortOrder } from '../extractSortOrder/extractSortOrder';
import { extractSortType } from '../extractSortType/extractSortType';

export const parseSearchParams = (searchParams: URLSearchParams) => {
    const order = searchParams.get('order') as SortOrder;
    const sort = searchParams.get('sort') as ArticleSortType;
    const search = searchParams.get('query') || '';
    const category = searchParams.get('category') as ArticleCategory;

    return {
        order: order || extractSortOrder(sort),
        sort: extractSortType(sort),
        search,
        category: extractCategory(category),
    };
};
