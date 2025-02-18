import { toggleFeatures } from '@/shared/lib/features';
import { ArticleSortField, ArticleSortType } from '@/entities/Article';

export const defaultSort = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => ArticleSortField.CREATED_ASC,
    off: () => 'createdAt' as ArticleSortType,
}) as ArticleSortType;
