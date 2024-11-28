import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticleByIdThunk } from './fetchArticleByIdThunk';

import { testArticleData } from '../../../testing';

describe('async thunk fetchArticleById test', () => {
    test('successfully fetches an article', async () => {
        const thunk = new TestAsyncThunk(fetchArticleByIdThunk);
        thunk.api.get.mockReturnValue(
            Promise.resolve({ data: testArticleData }),
        );

        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalledWith('/articles/1', {
            params: {
                _expand: 'user',
            },
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(testArticleData);
    });

    test('error when article is not found', async () => {
        const thunk = new TestAsyncThunk(fetchArticleByIdThunk);
        thunk.api.get.mockReturnValue(Promise.resolve({ data: null }));

        const result = await thunk.callThunk('1');

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('Article not found.');
    });

    test('error when API call fails', async () => {
        const thunk = new TestAsyncThunk(fetchArticleByIdThunk);
        thunk.api.get.mockReturnValue(
            Promise.reject(new Error('Failed to fetch article.')),
        );

        const result = await thunk.callThunk('1');

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('Failed to fetch article.');
    });

    test('error when article ID is missing', async () => {
        const thunk = new TestAsyncThunk(fetchArticleByIdThunk);

        const result = await thunk.callThunk(undefined);

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('Article ID is required.');
    });
});
