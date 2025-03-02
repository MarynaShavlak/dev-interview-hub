import { query as firebaseQuery } from 'firebase/firestore';
import { Article, ArticleCategory, ArticleSort } from '../../..';
import { SortOrder } from '@/shared/types/sortOrder';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { createQueryConstraints } from '../createQueryConstraints/createQueryConstraints';
import { getFilteredArticles } from '../getFilteredArticles/getFilteredArticles';
import { filterAndPaginateArticles } from '../filterAndPaginateArticles/filterAndPaginateArticles';

export interface GetFilteredArticlesArgs {
    sort: ArticleSort;
    order: SortOrder;
    category: ArticleCategory[];
    limit: number;
    query: string;
    page: number;
}

export const fetchAllFilteredArticlesFromFirestore = async (
    params: GetFilteredArticlesArgs,
) => {
    const { sort, order, category, limit, query, page } = params;
    const collectionRef = dataPoint<Article>('articles');
    const constraints = createQueryConstraints({
        sort,
        order,
        category,
    });

    const filteredQuery = firebaseQuery(collectionRef, ...constraints);
    const allArticles = await getFilteredArticles(filteredQuery);
    const articles = filterAndPaginateArticles({
        articles: allArticles,
        query,
        page,
        limit,
    });
    return articles;
};
