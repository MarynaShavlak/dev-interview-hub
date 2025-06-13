import { getDoc, increment, updateDoc } from 'firebase/firestore';

import { Article } from '../../../model/types/article';
import { ERROR_ARTICLE_MESSAGES } from '../../../model/consts/errorArticleMessages';
import { assertExists } from '@/shared/lib/checks/assertExists/assertExists';
import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';

export const incrementArticleViewsInFirestore = async (articleId: string) => {
    const articleDocRef = await getDocRefByField<Article>(
        'articles',
        'id',
        articleId,
    );
    if (!articleDocRef) {
        throw new Error(ERROR_ARTICLE_MESSAGES.ARTICLE_NOT_FOUND(articleId));
    }

    await updateDoc(articleDocRef, {
        views: increment(1),
    });
    const updatedDoc = await getDoc(articleDocRef);
    const updatedData = updatedDoc.data();
    assertExists(
        updatedData,
        ERROR_ARTICLE_MESSAGES.UPDATED_DATA_RETRIEVAL_ERROR(articleId),
    );
    return updatedData as Article;
};
