import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchCommentsByArticleId } from './fetchCommentsByArticleId';
import { Comment } from '@/entities/Comment';

const commentsData: Comment[] = [
    {
        id: '1',
        user: {
            id: '123',
            username: 'Maryna Shavlak',
        },
        text: 'This is a comment.',
    },
    {
        id: '2',
        user: {
            id: '456',
            username: 'Max Shavlak',
        },
        text: 'This is another comment.',
    },
];

describe('fetchCommentsByArticleId.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
        thunk.api.get.mockReturnValue(Promise.resolve({ data: commentsData }));

        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalledWith('/comments', {
            params: {
                articleId: '1',
                _expand: 'user',
            },
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(commentsData);
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
