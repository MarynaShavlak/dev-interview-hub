import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { addCommentForArticle } from './addCommentForArticle';
import { Comment } from '@/entities/Comment';
import { User } from '@/entities/User';
import { Article } from '@/entities/Article';

// Mock data
const mockUserData: User = {
    id: '123',
    username: 'Maryna Shavlak',
};

const mockArticleData: Article = {
    id: '1',
    user: mockUserData,
    title: 'Test Article',
    subtitle: 'This is a test subtitle.',
    img: 'test-image-url',
    views: 100,
    createdAt: '2023-01-01T00:00:00.000Z',
    category: [],
    blocks: [],
};

const mockComment: Comment = {
    id: '1',
    user: mockUserData,
    text: 'This is a comment.',
};

const mockState = {
    user: {
        authData: mockUserData,
    },
    article: {
        details: mockArticleData,
    },
};

// Tests
describe('addCommentForArticle', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle);
        thunk.api.post.mockReturnValue(Promise.resolve({ data: mockComment }));
        // thunk.getState = () => mockState;

        const result = await thunk.callThunk('This is a comment.');

        expect(thunk.api.post).toHaveBeenCalledWith('/comments', {
            articleId: '1',
            userId: '123',
            text: 'This is a comment.',
        });
        expect(thunk.api.post).toHaveBeenCalledTimes(1);
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(mockComment);
    });

    // test('error - missing user data', async () => {
    //     const thunk = new TestAsyncThunk(addCommentForArticle);
    //     thunk.api.post.mockReturnValue(
    //         Promise.reject(new Error('Failed to add comment.')),
    //     );
    //     thunk.getState = () => ({
    //         ...mockState,
    //         user: { authData: undefined },
    //     });
    //
    //     const result = await thunk.callThunk('This is a comment.');
    //
    //     expect(result.meta.requestStatus).toBe('rejected');
    //     expect(result.payload).toBe('Required data is missing.');
    // });
    //
    // test('error - missing article data', async () => {
    //     const thunk = new TestAsyncThunk(addCommentForArticle);
    //     thunk.api.post.mockReturnValue(
    //         Promise.reject(new Error('Failed to add comment.')),
    //     );
    //     thunk.getState = () => ({
    //         ...mockState,
    //         article: { details: undefined },
    //     });
    //
    //     const result = await thunk.callThunk('This is a comment.');
    //
    //     expect(result.meta.requestStatus).toBe('rejected');
    //     expect(result.payload).toBe('Required data is missing.');
    // });
    //
    // test('error - API failure', async () => {
    //     const thunk = new TestAsyncThunk(addCommentForArticle);
    //     thunk.api.post.mockReturnValue(
    //         Promise.reject(new Error('Failed to add comment.')),
    //     );
    //     thunk.getState = () => mockState;
    //
    //     const result = await thunk.callThunk('This is a comment.');
    //
    //     expect(result.meta.requestStatus).toBe('rejected');
    //     expect(result.payload).toBe('Failed to add comment.');
    // });
    //
    // test('error - missing comment text', async () => {
    //     const thunk = new TestAsyncThunk(addCommentForArticle);
    //     thunk.getState = () => mockState;
    //
    //     const result = await thunk.callThunk('');
    //
    //     expect(result.meta.requestStatus).toBe('rejected');
    //     expect(result.payload).toBe('Required data is missing.');
    // });
});
