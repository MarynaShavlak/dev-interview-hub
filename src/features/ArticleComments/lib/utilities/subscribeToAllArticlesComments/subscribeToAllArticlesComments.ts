import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { onSnapshot, query } from 'firebase/firestore';
import { ArticleComment } from '../../../model/types/articleComment';
import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';
import { ERROR_COMMENT_MESSAGES } from '../../../model/consts/errorCommentMessages';
import { dataPoint } from '@/shared/lib/firestore/firestore';

export const subscribeToAllArticlesComments = (
    updateCachedData: (
        updater: (draft: MaybeDrafted<ArticleComment[]>) => void,
    ) => void,
) => {
    let unsubscribe: (() => void) | undefined;

    try {
        const collectionRef = dataPoint<ArticleComment>('comments');
        const queryRef = query(collectionRef);
        unsubscribe = onSnapshot(queryRef, (snapshot) => {
            updateCachedData((draft) => {
                const result = snapshot?.docs?.map((doc) =>
                    doc.data(),
                ) as ArticleComment[];
                return result;
            });
        });
    } catch (error) {
        handleRequestErrorMessage(
            ERROR_COMMENT_MESSAGES.COMMENTS_SNAPSHOT_FAIL,
            error,
        );
    }

    return unsubscribe;
};
