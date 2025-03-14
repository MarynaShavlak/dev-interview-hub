import { createSelector } from '@reduxjs/toolkit';
import { articleFirebaseApi } from '@/entities/Article';
import { getUserAuthData } from '@/entities/User';

export const getCanEditArticle = (articleId: string) =>
    createSelector(
        [
            (state) =>
                articleFirebaseApi.endpoints.getArticleDataById.select(
                    articleId,
                )(state)?.data,
            getUserAuthData,
        ],
        (article, user) => {
            if (!article || !user) {
                return false;
            }
            return article.user.id === user.id;
        },
    );
