import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchCommentsByArticleId } from './fetchCommentsByArticleId';
import { testCommentsData } from '../../../../../entities/Comment/testing';

describe('async thunk fetchCommentsByArticleId test', () => {
    test('success - returns comments', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
        thunk.api.get.mockReturnValue(
            Promise.resolve({ data: testCommentsData }),
        );

        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalledWith('/comments', {
            params: {
                articleId: '1',
                _expand: 'user',
            },
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(testCommentsData);
    });

    test('error - no comments found', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
        thunk.api.get.mockReturnValue(Promise.resolve({ data: null }));

        const result = await thunk.callThunk('1');

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('No comments found.');
    });

    test('error - API failure', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
        thunk.api.get.mockReturnValue(
            Promise.reject(new Error('Failed to fetch comments.')),
        );

        const result = await thunk.callThunk('1');

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('Failed to fetch comments.');
    });

    test('error - missing article ID', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);

        const result = await thunk.callThunk(undefined);

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('Article ID is required.');
    });
});
