import { createArticlesByUserQuery } from '../createArticlesByUserQuery/createArticlesByUserQuery';
import { fetchQueryResults } from '@/shared/lib/firestore/fetchQueryResults/fetchQueryResults';
import { Article } from '../../../model/types/article';

export const fetchArticlesForUser = async (userId: string) => {
    const articlesQuery = createArticlesByUserQuery(userId);

    const articles = await fetchQueryResults<Article>(articlesQuery);
    return articles;
};
