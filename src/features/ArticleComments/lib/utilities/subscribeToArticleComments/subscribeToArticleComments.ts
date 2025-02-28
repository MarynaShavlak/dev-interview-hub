import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { onSnapshot } from 'firebase/firestore';
import { createArticleCommentsQuery } from '../createArticleCommentsQuery/createArticleCommentsQuery';
import { ArticleComment } from '../../../model/types/articleComment';
import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';
import { ERROR_MESSAGES } from '../../../model/consts/errorMessages';

export const subscribeToArticleComments = (
    updateCachedData: (
        updater: (draft: MaybeDrafted<ArticleComment[]>) => void,
    ) => void,
    articleId: string,
) => {
    let unsubscribe: (() => void) | undefined;

    try {
        if (!articleId) return undefined;
        const commentsQuery = createArticleCommentsQuery(articleId);

        unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
            updateCachedData((draft) => {
                const result = snapshot?.docs?.map((doc) =>
                    doc.data(),
                ) as ArticleComment[];
                return result;
            });
        });
    } catch (error) {
        handleRequestErrorMessage(ERROR_MESSAGES.COMMENTS_SNAPSHOT_FAIL, error);
    }

    return { unsubscribe };
};
