import { query, where, getDocs, DocumentReference } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { Article } from '../../../model/types/article';

export const getArticleDocRefById = async (
    articleId: string,
): Promise<DocumentReference | null> => {
    const articlesCollection = dataPoint<Article>('articles');
    const q = query(articlesCollection, where('id', '==', articleId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].ref;
    }
    return null;
};
