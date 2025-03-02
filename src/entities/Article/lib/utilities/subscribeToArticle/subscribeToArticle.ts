import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { onSnapshot } from 'firebase/firestore';

import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';

import { Article } from '../../..';
import { ERROR_ARTICLE_MESSAGES } from '../../../model/consts/errorArticleMessages';
import { createArticleQuery } from '../createArticleQuery/createArticleQuery';

export const subscribeToArticle = (
    updateCachedData: (updater: (draft: MaybeDrafted<Article>) => void) => void,
    articleId: string,
) => {
    let unsubscribe: (() => void) | undefined;

    try {
        if (!articleId) return undefined;
        const articleQuery = createArticleQuery(articleId);

        unsubscribe = onSnapshot(articleQuery, (snapshot) => {
            updateCachedData((draft) => {
                const result = snapshot?.docs?.map((doc) =>
                    doc.data(),
                ) as Article[];
                return result[0];
            });
        });
    } catch (error) {
        handleRequestErrorMessage(
            ERROR_ARTICLE_MESSAGES.ARTICLE_SNAPSHOT_FAIL(articleId),
            error,
        );
    }

    return unsubscribe;
};
