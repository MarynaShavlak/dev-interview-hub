import { getDoc, increment, updateDoc } from 'firebase/firestore';

import { Article } from '../../../model/types/article';
import { ERROR_ARTICLE_MESSAGES } from '../../../model/consts/errorArticleMessages';
import { getArticleDocRefById } from '../getArticleDocRefById/getArticleDocRefById';
import { assertExists } from '@/shared/lib/checks/assertExists/assertExists';

export const incrementArticleViewsInFirestore = async (articleId: string) => {
    const articleDocRef = await getArticleDocRefById(articleId);
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
