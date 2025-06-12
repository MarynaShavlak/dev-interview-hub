import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { Article } from '../../../model/types/article';
import { ERROR_ARTICLE_MESSAGES } from '../../../model/consts/errorArticleMessages';
import { subscribeToUserCollection } from '@/shared/lib/firestore';

export const subscribeToUserArticles = (
    updateCachedData: (
        updater: (draft: MaybeDrafted<Article[]>) => void,
    ) => void,
    userId: string,
): (() => void) | undefined => {
    return subscribeToUserCollection<Article>(
        'articles',
        userId,
        updateCachedData,
        ERROR_ARTICLE_MESSAGES.ARTICLES_SNAPSHOT_FAIL,
    );
};
