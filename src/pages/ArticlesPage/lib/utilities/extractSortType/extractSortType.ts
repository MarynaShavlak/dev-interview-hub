import { ArticleSortType } from '@/entities/Article';

export const extractSortType = (
    sort: ArticleSortType,
): ArticleSortType | null => {
    if (!sort || !sort.includes('_')) return sort as ArticleSortType;
    return sort.split('_')[1] as ArticleSortType;
};
