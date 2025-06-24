import { getCanEditLiveCodeTask } from './getCanEditLiveCodeTask';
import { StateSchema } from '@/app/providers/StoreProvider';
import { testArticleData } from '@/entities/Article/testing';
import { testUserData } from '@/entities/User/testing';
import { articleFirebaseApi } from '@/entities/Article';

// Mock articleId for testing
const TEST_ARTICLE_ID = 'testArticleId';

describe('getCanEditArticle selector', () => {
    const canEditSelector = getCanEditLiveCodeTask(TEST_ARTICLE_ID);

    test('should return true when authenticated user is the article author', () => {
        const state: DeepPartial<StateSchema> = {
            [articleFirebaseApi.reducerPath]: {
                queries: {
                    [`getArticleDataById("${TEST_ARTICLE_ID}")`]: {
                        data: {
                            ...testArticleData,
                            user: { id: testUserData.id },
                        },
                    },
                },
            },
            user: {
                authData: testUserData,
            },
        };

        expect(canEditSelector(state as StateSchema)).toBe(true);
    });

    test('should return false when authenticated user is not the article author', () => {
        const state: DeepPartial<StateSchema> = {
            [articleFirebaseApi.reducerPath]: {
                queries: {
                    [`getArticleDataById("${TEST_ARTICLE_ID}")`]: {
                        data: {
                            ...testArticleData,
                            user: { id: 'differentUserId' },
                        },
                    },
                },
            },
            user: {
                authData: testUserData,
            },
        };

        expect(canEditSelector(state as StateSchema)).toBe(false);
    });

    test('should return false when article data is not available', () => {
        const state: DeepPartial<StateSchema> = {
            [articleFirebaseApi.reducerPath]: {
                queries: {
                    [`getArticleDataById("${TEST_ARTICLE_ID}")`]: {
                        data: undefined,
                    },
                },
            },
            user: {
                authData: testUserData,
            },
        };

        expect(canEditSelector(state as StateSchema)).toBe(false);
    });

    test('should return false when user authentication data is not available', () => {
        const state: DeepPartial<StateSchema> = {
            [articleFirebaseApi.reducerPath]: {
                queries: {
                    [`getArticleDataById("${TEST_ARTICLE_ID}")`]: {
                        data: testArticleData,
                    },
                },
            },
            user: {
                authData: undefined,
            },
        };

        expect(canEditSelector(state as StateSchema)).toBe(false);
    });

    test('should return false when both article and user data are unavailable', () => {
        const state: DeepPartial<StateSchema> = {
            [articleFirebaseApi.reducerPath]: {
                queries: {
                    [`getArticleDataById("${TEST_ARTICLE_ID}")`]: {
                        data: undefined,
                    },
                },
            },
            user: {
                authData: undefined,
            },
        };

        expect(canEditSelector(state as StateSchema)).toBe(false);
    });
});
