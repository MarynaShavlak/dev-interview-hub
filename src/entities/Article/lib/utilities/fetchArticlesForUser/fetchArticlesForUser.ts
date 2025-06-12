import { fetchQueryResults } from '@/shared/lib/firestore/fetchQueryResults/fetchQueryResults';
import { Article } from '../../../model/types/article';
import { createUserBasedQuery } from '@/shared/lib/firestore';

export const fetchArticlesForUser = async (userId: string) => {
    const articlesQuery = createUserBasedQuery<Article>('articles', userId);

    const articles = await fetchQueryResults<Article>(articlesQuery);
    return articles;
};
