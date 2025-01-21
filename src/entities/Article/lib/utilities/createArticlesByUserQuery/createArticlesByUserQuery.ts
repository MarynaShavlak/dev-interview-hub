import { Query, query, where, orderBy } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';

import { Article } from '../../../model/types/article';

export const createArticlesByUserQuery = (userId: string): Query<Article> => {
    const articlesCollection = dataPoint<Article>('articles');

    return query(
        articlesCollection,
        where('user.id', '==', userId),
        orderBy('createdAt', 'desc'),
    );
};
