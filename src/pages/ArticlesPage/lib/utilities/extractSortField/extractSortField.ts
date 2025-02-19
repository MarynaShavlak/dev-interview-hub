import { ArticleSortType } from '@/entities/Article';

export const extractSortField = (
    sort: ArticleSortType,
): ArticleSortType | null => {
    const parts = sort?.split('_');
    return (parts?.[1] as ArticleSortType) || null;
};
