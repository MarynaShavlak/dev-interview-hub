import { createAlgoliaIndexNameFromUrl } from '../createAlgoliaIndexNameFromUrl/createAlgoliaIndexNameFromUrl';
import { SortOrder } from '@/shared/types/sortOrder';
import { ArticleSortType } from '@/entities/Article';

export const getModifiedSort = (
    sort: ArticleSortType,
    order: SortOrder,
    shouldFetchData: boolean,
) => {
    if (shouldFetchData) {
        return sort;
    }

    if (sort.includes('_')) {
        return sort;
    }

    return createAlgoliaIndexNameFromUrl(sort, order);
};
