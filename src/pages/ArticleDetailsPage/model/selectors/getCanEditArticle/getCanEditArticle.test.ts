import { getCanEditArticle } from './getCanEditArticle';
import { StateSchema } from '@/app/providers/StoreProvider';
import { testArticleData } from '@/entities/Article/testing';
import { testUserData } from '@/entities/User/testing';

describe('getCanEditArticle selector', () => {
    test('should return true when the article author is the authenticated user', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: { data: testArticleData },
            user: {
                authData: testUserData,
            },
        };

        expect(getCanEditArticle(state as StateSchema)).toEqual(true);
    });

    test('should return false when the article author is not the authenticated user', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: { data: testArticleData },
            user: {
                authData: { id: 'anotherId', username: 'testUsername' },
            },
        };

        expect(getCanEditArticle(state as StateSchema)).toEqual(false);
    });

    test('should return false when article data is missing', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                data: undefined,
            },
            user: {
                authData: testUserData,
            },
        };

        expect(getCanEditArticle(state as StateSchema)).toEqual(false);
    });

    test('should return false when user data is missing', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                data: testArticleData,
            },
            user: {
                authData: undefined,
            },
        };

        expect(getCanEditArticle(state as StateSchema)).toEqual(false);
    });

    test('should return false when both article and user data are missing', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                data: undefined,
            },
            user: {
                authData: undefined,
            },
        };

        expect(getCanEditArticle(state as StateSchema)).toEqual(false);
    });
});
