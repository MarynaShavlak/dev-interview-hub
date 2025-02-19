import { ArticleSortType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sortOrder';

export const extractSortOrder = (sort: ArticleSortType): SortOrder | null => {
    if (!sort || !sort.includes('_')) return null;
    return sort.split('_')[2] as SortOrder;
};
