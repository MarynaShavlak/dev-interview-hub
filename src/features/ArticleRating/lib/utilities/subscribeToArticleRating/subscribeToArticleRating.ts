import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { onSnapshot } from 'firebase/firestore';
import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';
import { ArticleRatingType } from '../../../model/types/articleRatingType';
import { createArticleRatingQuery } from '../createArticleRatingQuery/createArticleRatingQuery';
import { ERROR_RATING_MESSAGES } from '../../../model/consts/errorRatingMessages';

export const subscribeToArticleRating = (
    updateCachedData: (
        updater: (draft: MaybeDrafted<ArticleRatingType[]>) => void,
    ) => void,
    { articleId, userId }: { articleId: string; userId: string },
) => {
    let unsubscribe: (() => void) | undefined;

    try {
        if (!articleId || !userId) return undefined;
        const ratingQuery = createArticleRatingQuery(articleId, userId);

        unsubscribe = onSnapshot(ratingQuery, (snapshot) => {
            updateCachedData((draft) => {
                const result = snapshot?.docs?.map((doc) =>
                    doc.data(),
                ) as ArticleRatingType[];
                return result;
            });
        });
    } catch (error) {
        handleRequestErrorMessage(
            ERROR_RATING_MESSAGES.FETCH_RATING_SNAPSHOT_FAIL,
            error,
        );
    }

    return unsubscribe;
};
