import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { onSnapshot } from 'firebase/firestore';
import { ArticleComment } from '../../..';
import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';
import { ERROR_MESSAGES } from '../../../model/consts/errorMessages';
import { createCommentsByArticleIdsQuery } from '../createCommentsByArticleIdsQuery/createCommentsByArticleIdsQuery';

export const subscribeToMultipleArticlesComments = (
    updateCachedData: (
        updater: (draft: MaybeDrafted<ArticleComment[]>) => void,
    ) => void,
    articleIds: string[],
) => {
    let unsubscribe: (() => void) | undefined;

    try {
        const commentsQuery = createCommentsByArticleIdsQuery(articleIds);
        if (commentsQuery) {
            unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
                updateCachedData((draft) => {
                    const result = snapshot?.docs?.map((doc) =>
                        doc.data(),
                    ) as ArticleComment[];
                    return result;
                });
            });
        }
    } catch (error) {
        handleRequestErrorMessage(ERROR_MESSAGES.COMMENTS_SNAPSHOT_FAIL, error);
    }

    return unsubscribe;
};
