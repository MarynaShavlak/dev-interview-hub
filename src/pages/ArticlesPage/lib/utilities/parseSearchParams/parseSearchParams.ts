import { SortOrder } from '@/shared/types/sortOrder';
import { ArticleCategory, ArticleSortType } from '@/entities/Article';
import { extractCategory } from '../extractCategory/extractCategory';

export const parseSearchParams = (searchParams: URLSearchParams) => {
    const order = searchParams.get('order') as SortOrder;
    console.log('parseSearchParams___order', order);
    const sort = searchParams.get('sort') as ArticleSortType;
    const search = searchParams.get('query') || '';
    const category = searchParams.get('category') as ArticleCategory;

    return {
        order:
            order ||
            (sort?.includes('_')
                ? (sort.split('_')[2] as SortOrder)
                : undefined),
        sort: sort?.includes('_')
            ? (sort.split('_')[1] as ArticleSortType)
            : sort,
        search,
        category: extractCategory(category),
    };
};
