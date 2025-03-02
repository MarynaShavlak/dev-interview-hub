import { query, Query, where } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { Article } from '../../../model/types/article';

export const createArticleQuery = (articleId: string): Query<Article> => {
    const articlesCollection = dataPoint<Article>('articles');
    return query(articlesCollection, where('id', '==', articleId));
};
