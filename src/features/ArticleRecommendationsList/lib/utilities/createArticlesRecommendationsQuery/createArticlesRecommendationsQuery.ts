import { query, Query, QueryConstraint, where } from 'firebase/firestore';
import { Article, ArticleCategory } from '@/entities/Article';
import { dataPoint } from '@/shared/lib/firestore/firestore';

/**
 * Constructs a Firestore query with the provided filters.
 * @param category - Categories to filter by.
 * @param exceptArticleId - Article ID to exclude.
 * @returns A Firestore query with the applied filters.
 */
export const createArticlesRecommendationsQuery = (
    category: ArticleCategory[] | undefined,
    exceptArticleId: string | undefined,
): Query<Article> => {
    const collectionRef = dataPoint<Article>('articles');
    const constraints: QueryConstraint[] = [];

    if (category?.length) {
        constraints.push(where('category', 'array-contains-any', category));
    }

    if (exceptArticleId) {
        constraints.push(where('id', '!=', exceptArticleId));
    }

    return query(collectionRef, ...constraints);
};
