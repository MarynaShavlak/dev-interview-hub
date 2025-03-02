import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { onSnapshot } from 'firebase/firestore';
import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';
import { Article } from '../../..';
import { ERROR_ARTICLE_MESSAGES } from '../../../model/consts/errorArticleMessages';
import { createArticlesByUserQuery } from '../createArticlesByUserQuery/createArticlesByUserQuery';

export const subscribeToUserArticles = (
    updateCachedData: (
        updater: (draft: MaybeDrafted<Article[]>) => void,
    ) => void,
    userId: string,
) => {
    let unsubscribe: (() => void) | undefined;

    try {
        if (!userId) return undefined;
        const articlesQuery = createArticlesByUserQuery(userId);

        unsubscribe = onSnapshot(articlesQuery, (snapshot) => {
            updateCachedData((draft) => {
                const result = snapshot?.docs?.map((doc) =>
                    doc.data(),
                ) as Article[];
                return result;
            });
        });
    } catch (error) {
        handleRequestErrorMessage(
            ERROR_ARTICLE_MESSAGES.ARTICLES_SNAPSHOT_FAIL,
            error,
        );
    }

    return unsubscribe;
};
