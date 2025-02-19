import { ArticleCategory } from '@/entities/Article';

export const extractCategory = (
    category: string | null,
): ArticleCategory | null => {
    if (!category) return null;
    return category.includes('-')
        ? (category.split('-')[0] as ArticleCategory)
        : (category as ArticleCategory);
};
