import { EntityState } from '@reduxjs/toolkit';
import { firestoreApi } from '@/shared/api/firestoreApi';
import { Article } from '../model/types/article';
import { articlesAdapter, initialState } from '../model/slices/articleSlice';
import {
    deleteDocFromFirestore,
    executeQuery,
    handleFirestoreSubscription,
} from '@/shared/lib/firestore';

import { ERROR_ARTICLE_MESSAGES } from '../model/consts/errorArticleMessages';
import {
    NewArticleDraft,
    saveArticleToFirestore,
} from '../lib/utilities/saveArticleToFirestore/saveArticleToFirestore';
import { updateArticleInFirestore } from '../lib/utilities/updateArticleInFirestore/updateArticleInFirestore';
import { incrementArticleViewsInFirestore } from '../lib/utilities/incrementArticleViewsInFirestore/incrementArticleViewsInFirestore';
import { fetchArticlesForUser } from '../lib/utilities/fetchArticlesForUser/fetchArticlesForUser';
import { subscribeToUserArticles } from '../lib/utilities/subscribeToUserArticles/subscribeToUserArticles';
import { fetchArticle } from '../lib/utilities/fetchArticle/fetchArticle';
import { subscribeToArticle } from '../lib/utilities/subscribeToArticle/subscribeToArticle';
import { fetchAllArticlesFromFirestore } from '../lib/utilities/fetchAllArticlesFromFirestore/fetchAllArticlesFromFirestore';
import {
    fetchAllFilteredArticlesFromFirestore,
    GetFilteredArticlesArgs,
} from '../lib/utilities/fetchAllFilteredArticlesFromFirestore/fetchAllFilteredArticlesFromFirestore';

interface UpdateArticleArgs {
    articleId: string;
    updates: Partial<Article>;
}

export const articleFirebaseApi = firestoreApi
    .enhanceEndpoints({
        addTagTypes: ['Articles'],
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getFilteredArticles: build.query<
                Article[],
                GetFilteredArticlesArgs
            >({
                providesTags: ['Articles'],
                async queryFn(params) {
                    return executeQuery(
                        () => fetchAllFilteredArticlesFromFirestore(params),
                        ERROR_ARTICLE_MESSAGES.FILTERED_ARTICLES_FETCH_FAIL,
                    );
                },
            }),
            getArticles: build.query<EntityState<Article>, void>({
                providesTags: ['Articles'],
                async queryFn() {
                    return executeQuery(
                        () => fetchAllArticlesFromFirestore(),
                        ERROR_ARTICLE_MESSAGES.ARTICLES_FETCH_FAIL,
                    );
                },
            }),
            getArticlesByUserId: build.query<Article[], string>({
                providesTags: [{ type: 'Articles', id: 'userId' }],
                keepUnusedDataFor: 3600,
                async queryFn(userId) {
                    if (!userId) {
                        return {
                            error: new Error(
                                ERROR_ARTICLE_MESSAGES.USER_NOT_FOUND,
                            ),
                        };
                    }
                    return executeQuery(
                        () => fetchArticlesForUser(userId),
                        ERROR_ARTICLE_MESSAGES.ARTICLES_BY_USER_ID_FETCH_FAIL(
                            userId,
                        ),
                    );
                },
                async onCacheEntryAdded(
                    userId,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    handleFirestoreSubscription({
                        subscriptionFn: subscribeToUserArticles,
                        updateFn: updateCachedData,
                        dependency: userId,
                        cacheDataLoaded,
                        cacheEntryRemoved,
                    });
                },
            }),
            getArticleDataById: build.query<Article, string>({
                async queryFn(articleId) {
                    return executeQuery(
                        () => fetchArticle(articleId),
                        ERROR_ARTICLE_MESSAGES.FETCH_ARTICLE_ERROR(articleId),
                    );
                },
                async onCacheEntryAdded(
                    articleId,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    handleFirestoreSubscription({
                        subscriptionFn: subscribeToArticle,
                        updateFn: updateCachedData,
                        dependency: articleId,
                        cacheDataLoaded,
                        cacheEntryRemoved,
                    });
                },
            }),
            addArticle: build.mutation<Article, NewArticleDraft>({
                invalidatesTags: ['Articles'],
                async queryFn(newArticle) {
                    return executeQuery(
                        () => saveArticleToFirestore(newArticle),
                        ERROR_ARTICLE_MESSAGES.ADD_ARTICLE_FAIL,
                    );
                },
            }),
            deleteArticle: build.mutation<string, string>({
                invalidatesTags: ['Articles'],
                async queryFn(articleId) {
                    return executeQuery(
                        () => deleteDocFromFirestore('articles', articleId),
                        ERROR_ARTICLE_MESSAGES.DELETE_ARTICLE_ERROR(articleId),
                    );
                },
            }),
            updateArticle: build.mutation<Article, UpdateArticleArgs>({
                invalidatesTags: ['Articles'],
                async queryFn({ articleId, updates }) {
                    return executeQuery(
                        async () =>
                            updateArticleInFirestore(articleId, updates),
                        ERROR_ARTICLE_MESSAGES.UPDATE_ARTICLE_ERROR(articleId),
                    );
                },
            }),
            incrementArticleViews: build.mutation<Article, string>({
                invalidatesTags: ['Articles'],
                async queryFn(articleId) {
                    return executeQuery(
                        async () => incrementArticleViewsInFirestore(articleId),
                        ERROR_ARTICLE_MESSAGES.INCREMENT_VIEWS_ERROR(articleId),
                    );
                },
            }),
        }),
    });

type RootState = {
    [articleFirebaseApi.reducerPath]: ReturnType<
        typeof articleFirebaseApi.reducer
    >;
};

export const getArticleDataByIdQuery =
    articleFirebaseApi.endpoints.getArticleDataById.initiate;
export const useArticleDataById = articleFirebaseApi.useGetArticleDataByIdQuery;

export const useGetArticles = articleFirebaseApi.useGetArticlesQuery;
export const useArticlesByUserId =
    articleFirebaseApi.useGetArticlesByUserIdQuery;
export const getArticlesQuery =
    articleFirebaseApi.endpoints.getArticles.initiate;

export const addArticleMutation =
    articleFirebaseApi.endpoints.addArticle.initiate;

export const deleteArticleMutation =
    articleFirebaseApi.endpoints.deleteArticle.initiate;
export const updateArticleMutation =
    articleFirebaseApi.endpoints.updateArticle.initiate;

export const incrementArticleViewsMutation =
    articleFirebaseApi.endpoints.incrementArticleViews.initiate;

export const selectEntryResult = (state: RootState) =>
    articleFirebaseApi.endpoints.getArticles.select()(state).data;

const entrySelectors = articlesAdapter.getSelectors(
    (state: RootState) => selectEntryResult(state) ?? initialState,
);
export const selectAllArticles = entrySelectors.selectAll;

export const useGetFilteredArticles =
    articleFirebaseApi.useGetFilteredArticlesQuery;

export const getFilteredArticlesQuery =
    articleFirebaseApi.endpoints.getFilteredArticles.initiate;
