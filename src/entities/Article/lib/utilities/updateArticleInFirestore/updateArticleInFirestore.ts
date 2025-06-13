import { getDoc, updateDoc } from 'firebase/firestore';

import { Article } from '../../../model/types/article';
import { ERROR_ARTICLE_MESSAGES } from '../../../model/consts/errorArticleMessages';
import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';

export const updateArticleInFirestore = async (
    articleId: string,
    updates: Partial<Article>,
) => {
    const articleDocRef = await getDocRefByField<Article>(
        'articles',
        'id',
        articleId,
    );
    if (!articleDocRef) {
        throw new Error(ERROR_ARTICLE_MESSAGES.ARTICLE_NOT_FOUND(articleId));
    }

    await updateDoc(articleDocRef, updates);
    const updatedDoc = await getDoc(articleDocRef);
    const updatedData = updatedDoc.data();
    if (!updatedData) {
        throw new Error(
            ERROR_ARTICLE_MESSAGES.UPDATED_DATA_RETRIEVAL_ERROR(articleId),
        );
    }

    return updatedData as Article;
};
