export {};
// import { addCommentForArticleThunk } from './addCommentForArticleThunk'; // Adjust path as needed
//
// import { StateSchema } from '@/app/providers/StoreProvider';
// import { ERROR_COMMENT_MESSAGES } from '../../consts/errorCommentMessages';
// import { getArticleDataByIdQuery } from '@/entities/Article';
// import { addCommentMutation } from '../../../api/articleCommentsApi';
// import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
// import { testComment } from '../../../testing';
//
// describe('addCommentForArticleThunk', () => {
//     let initialState: DeepPartial<StateSchema>;
//
//     beforeEach(() => {
//         // Reset mocks before each test
//         initialState = {
//             user: {
//                 authData: {
//                     id: '1',
//                     avatar: 'avatar-url',
//                     email: 'user@example.com',
//                     firstname: 'John',
//                     lastname: 'Doe',
//                     username: 'johndoe',
//                 },
//             },
//         };
//     });
//
//     // Test Case 1: Successful comment addition
//     test('should successfully add a comment to an article', async () => {
//         const mockArticle = { id: 'article1', title: 'Test Article' };
//
//         const thunk = new TestAsyncThunk(
//             addCommentForArticleThunk,
//             initialState,
//         );
//
//         // Mock dispatch responses
//         (thunk.dispatch as jest.Mock)
//             .mockResolvedValueOnce({
//                 unwrap: () => Promise.resolve(mockArticle),
//             }) // getArticleDataByIdQuery
//             .mockResolvedValueOnce({
//                 unwrap: () => Promise.resolve(testComment),
//             }); // addCommentMutation
//
//         const result = await thunk.callThunk({
//             text: 'This is a test comment',
//             articleId: 'article1',
//         });
//
//         expect(thunk.dispatch).toHaveBeenCalledTimes(3); // Initial call + 2 dispatched actions
//         expect(thunk.dispatch).toHaveBeenCalledWith(
//             getArticleDataByIdQuery('article1'),
//         );
//         expect(thunk.dispatch).toHaveBeenCalledWith(
//             addCommentMutation(
//                 expect.objectContaining({
//                     articleId: 'article1',
//                     text: 'This is a test comment',
//                     user: expect.objectContaining({
//                         id: '1',
//                         username: 'johndoe',
//                     }),
//                 }),
//             ),
//         );
//         if (typeof result !== 'string') {
//             expect(result.meta.requestStatus).toBe('fulfilled');
//             expect(result.payload).toEqual(testComment);
//         }
//     });
//
//     // Test Case 2: Missing user authentication
//     test('should reject if user authentication data is missing', async () => {
//         const thunk = new TestAsyncThunk(addCommentForArticleThunk, {
//             user: {},
//         });
//
//         const result = await thunk.callThunk({
//             text: 'Test comment',
//             articleId: 'article1',
//         });
//
//         expect(thunk.dispatch).toHaveBeenCalledTimes(3);
//         // expect(result.meta.requestStatus).toBe('rejected');
//         expect(result).toBe(ERROR_COMMENT_MESSAGES.USER_AUTH_MISSING);
//     });
//
//     // Test Case 3: Missing article details
//     // test('should reject if article details are missing', async () => {
//     //     const thunk = new TestAsyncThunk(
//     //         addCommentForArticleThunk,
//     //         initialState,
//     //     );
//     //
//     //     // Mock dispatch to return undefined for article
//     //     (thunk.dispatch as jest.Mock).mockResolvedValueOnce({
//     //         unwrap: () => Promise.resolve(undefined),
//     //     });
//     //
//     //     const result = await thunk.callThunk({
//     //         text: 'Test comment',
//     //         articleId: 'article1',
//     //     });
//     //
//     //     expect(thunk.dispatch).toHaveBeenCalledWith(
//     //         getArticleDataByIdQuery('article1'),
//     //     );
//     //     expect(thunk.dispatch).toHaveBeenCalledTimes(2); // Initial + getArticleDataByIdQuery
//     //     // expect(result.meta.requestStatus).toBe('rejected');
//     //     expect(result).toBe(ERROR_COMMENT_MESSAGES.ARTICLE_DETAILS_MISSING);
//     // });
//     //
//     // // Test Case 4: Empty or invalid comment text
//     // test('should reject if comment text is empty', async () => {
//     //     const mockArticle = { id: 'article1', title: 'Test Article' };
//     //     const thunk = new TestAsyncThunk(
//     //         addCommentForArticleThunk,
//     //         initialState,
//     //     );
//     //
//     //     // Mock dispatch for article data
//     //     (thunk.dispatch as jest.Mock).mockResolvedValueOnce({
//     //         unwrap: () => Promise.resolve(mockArticle),
//     //     });
//     //
//     //     const result = await thunk.callThunk({
//     //         text: '',
//     //         articleId: 'article1',
//     //     });
//     //
//     //     expect(thunk.dispatch).toHaveBeenCalledWith(
//     //         getArticleDataByIdQuery('article1'),
//     //     );
//     //     expect(thunk.dispatch).toHaveBeenCalledTimes(2); // Initial + getArticleDataByIdQuery
//     //     // expect(result.meta.requestStatus).toBe('rejected');
//     //     expect(result).toBe(ERROR_COMMENT_MESSAGES.COMMENT_TEXT_REQUIRED);
//     // });
//
//     // Test Case 5: API failure
//     // test('should reject if API call fails', async () => {
//     //     const mockArticle = { id: 'article1', title: 'Test Article' };
//     //     const thunk = new TestAsyncThunk(
//     //         addCommentForArticleThunk,
//     //         initialState,
//     //     );
//     //
//     //     // Mock dispatch responses
//     //     (thunk.dispatch as jest.Mock)
//     //         .mockResolvedValueOnce({
//     //             unwrap: () => Promise.resolve(mockArticle),
//     //         }) // getArticleDataByIdQuery
//     //         .mockRejectedValueOnce(new Error('API Error')); // addCommentMutation fails
//     //
//     //     const result = await thunk.callThunk({
//     //         text: 'Test comment',
//     //         articleId: 'article1',
//     //     });
//     //
//     //     expect(thunk.dispatch).toHaveBeenCalledWith(
//     //         getArticleDataByIdQuery('article1'),
//     //     );
//     //     expect(thunk.dispatch).toHaveBeenCalledWith(
//     //         addCommentMutation(
//     //             expect.objectContaining({
//     //                 articleId: 'article1',
//     //                 text: 'Test comment',
//     //             }),
//     //         ),
//     //     );
//     //     expect(thunk.dispatch).toHaveBeenCalledTimes(3); // Initial + 2 dispatched actions
//     //     // expect(result.meta.requestStatus).toBe('rejected');
//     //     expect(result).toBe(ERROR_COMMENT_MESSAGES.COMMENT_ADD_API_FAIL);
//     // });
// });

// __________________________________________________________________________________________________
// import { addCommentForArticleThunk } from './addCommentForArticleThunk';
// import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
//
// import { testCommentsData } from '@/entities/Comment/testing';
// import { testArticleData } from '@/entities/Article/testing';
// import { testUserData } from '@/entities/User/testing';
//
// jest.mock(
//     '@/features/ArticleComments/model/services/fetchCommentsByArticleIdThunk/fetchCommentsByArticleIdThunk',
//     () => ({
//         fetchCommentsByArticleId: jest.fn(),
//     }),
// );
//
// describe('async thunk addCommentForArticle test', () => {
//     test('successfully adds a comment', async () => {
//         const thunk = new TestAsyncThunk(addCommentForArticleThunk, {
//             articleDetails: { data: testArticleData },
//             user: {
//                 authData: testUserData,
//             },
//         });
//
//         thunk.api.post.mockReturnValue(
//             Promise.resolve({ data: testCommentsData[0] }),
//         );
//
//         const result = await thunk.callThunk('New comment text');
//
//         expect(thunk.api.post).toHaveBeenCalledWith('/comments', {
//             articleId: testArticleData.id,
//             userId: testUserData.id,
//             text: 'New comment text',
//         });
//         if (typeof result !== 'string') {
//             expect(result.meta.requestStatus).toBe('fulfilled');
//             expect(result.payload).toEqual(testCommentsData[0]);
//         }
//     });
//
// test('error when user data is missing', async () => {
//     const thunk = new TestAsyncThunk(addCommentForArticleThunk, {
//         user: {},
//         articleDetails: { data: testArticleData },
//     });
//
//     const result = await thunk.callThunk('New comment text');
//
//     expect(result.meta.requestStatus).toBe('rejected');
//     expect(result.payload).toBe('Required data is missing.');
// });
//
// test('error when article details are missing', async () => {
//     const thunk = new TestAsyncThunk(addCommentForArticleThunk, {
//         articleDetails: {
//             data: undefined,
//         },
//         user: {
//             authData: testUserData,
//         },
//     });
//
//     const result = await thunk.callThunk('New comment text');
//     expect(result.meta.requestStatus).toBe('rejected');
//     expect(result.payload).toBe('Required data is missing.');
// });
//
// test('error when comment text is missing', async () => {
//     const thunk = new TestAsyncThunk(addCommentForArticleThunk, {
//         articleDetails: { data: testArticleData },
//         user: {
//             authData: testUserData,
//         },
//     });
//
//     const result = await thunk.callThunk('');
//
//     expect(result.meta.requestStatus).toBe('rejected');
//     expect(result.payload).toBe('Required data is missing.');
// });
//
// test('error when API call fails', async () => {
//     const thunk = new TestAsyncThunk(addCommentForArticleThunk, {
//         articleDetails: { data: testArticleData },
//         user: {
//             authData: testUserData,
//         },
//     });
//
//     thunk.api.post.mockReturnValue(
//         Promise.reject(new Error('Failed to add comment.')),
//     );
//
//     const result = await thunk.callThunk('New comment text');
//
//     expect(result.meta.requestStatus).toBe('rejected');
//     expect(result.payload).toBe('Failed to add comment.');
// });
//
// test('error with missing data in response', async () => {
//     const thunk = new TestAsyncThunk(addCommentForArticleThunk, {
//         articleDetails: { data: testArticleData },
//         user: {
//             authData: testUserData,
//         },
//     });
//
//     thunk.api.post.mockReturnValue(Promise.resolve({ data: null }));
//
//     const result = await thunk.callThunk('New comment text');
//
//     expect(thunk.api.post).toHaveBeenCalledWith('/comments', {
//         articleId: testArticleData.id,
//         userId: testUserData.id,
//         text: 'New comment text',
//     });
//     expect(result.meta.requestStatus).toBe('rejected');
//     expect(result.payload).toEqual('No data received from API.');
// });
// });
