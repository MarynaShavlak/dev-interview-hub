import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { onSnapshot } from 'firebase/firestore';
import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';
import { ArticleRatingType } from '../../../model/types/articleRatingType';
import { createRatingsByArticleIdsQuery } from '../createRatingsByArticleIdsQuery/createRatingsByArticleIdsQuery';
import { ERROR_RATING_MESSAGES } from '../../../model/consts/errorRatingMessages';

export const subscribeToMultipleArticlesRatings = (
    updateCachedData: (
        updater: (draft: MaybeDrafted<ArticleRatingType[]>) => void,
    ) => void,
    articleIds: string[],
) => {
    let unsubscribe: (() => void) | undefined;

    try {
        const ratingsQuery = createRatingsByArticleIdsQuery(articleIds);
        if (ratingsQuery) {
            unsubscribe = onSnapshot(ratingsQuery, (snapshot) => {
                updateCachedData((draft) => {
                    const result = snapshot?.docs?.map((doc) =>
                        doc.data(),
                    ) as ArticleRatingType[];
                    return result;
                });
            });
        }
    } catch (error) {
        handleRequestErrorMessage(
            ERROR_RATING_MESSAGES.FETCH_RATING_SNAPSHOT_FAIL,
            error,
        );
    }

    return unsubscribe;
};
