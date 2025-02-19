import { ArticleSortType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sortOrder';

export const parseOrderField = (sort: ArticleSortType): SortOrder | null => {
    const parts = sort?.split('_');
    return (parts?.[1] as SortOrder) || null;
};
