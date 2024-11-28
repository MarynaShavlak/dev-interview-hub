import { addCommentForArticle } from './addCommentForArticle';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { testCommentsData } from '@/entities/Comment/testing';
import { testArticleData } from '@/entities/Article/testing';
import { testUserData } from '@/entities/User/testing';

jest.mock(
    '@/features/ArticleComments/model/services/fetchCommentsByArticleIdThunk/fetchCommentsByArticleIdThunk',
    () => ({
        fetchCommentsByArticleId: jest.fn(),
    }),
);

describe('async thunk addCommentForArticle test', () => {
    test('successfully adds a comment', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle, {
            articleDetails: { data: testArticleData },
            user: {
                authData: testUserData,
            },
        });

        thunk.api.post.mockReturnValue(
            Promise.resolve({ data: testCommentsData[0] }),
        );

        const result = await thunk.callThunk('New comment text');

        expect(thunk.api.post).toHaveBeenCalledWith('/comments', {
            articleId: testArticleData.id,
            userId: testUserData.id,
            text: 'New comment text',
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(testCommentsData[0]);
    });

    test('error when user data is missing', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle, {
            user: {},
            articleDetails: { data: testArticleData },
        });

        const result = await thunk.callThunk('New comment text');

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('Required data is missing.');
    });

    test('error when article details are missing', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle, {
            articleDetails: {
                data: undefined,
            },
            user: {
                authData: testUserData,
            },
        });

        const result = await thunk.callThunk('New comment text');
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('Required data is missing.');
    });

    test('error when comment text is missing', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle, {
            articleDetails: { data: testArticleData },
            user: {
                authData: testUserData,
            },
        });

        const result = await thunk.callThunk('');

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('Required data is missing.');
    });

    test('error when API call fails', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle, {
            articleDetails: { data: testArticleData },
            user: {
                authData: testUserData,
            },
        });

        thunk.api.post.mockReturnValue(
            Promise.reject(new Error('Failed to add comment.')),
        );

        const result = await thunk.callThunk('New comment text');

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('Failed to add comment.');
    });

    test('error with missing data in response', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle, {
            articleDetails: { data: testArticleData },
            user: {
                authData: testUserData,
            },
        });

        thunk.api.post.mockReturnValue(Promise.resolve({ data: null }));

        const result = await thunk.callThunk('New comment text');

        expect(thunk.api.post).toHaveBeenCalledWith('/comments', {
            articleId: testArticleData.id,
            userId: testUserData.id,
            text: 'New comment text',
        });
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual('No data received from API.');
    });
});
