import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticlesListThunk } from './fetchArticlesListThunk';

import { ArticleCategory } from '@/entities/Article';

import { testArticlesListData } from '@/entities/Article/testing';

describe('async thunk fetchArticlesListThunk test', () => {
    test('should fetch articles list successfully', async () => {
        const limit = 10;
        const page = 1;
        const order = 'asc';
        const sort = 'title'; // Assuming this is what your app uses
        const search = '';
        const category = ArticleCategory.ALL;

        const thunk = new TestAsyncThunk(fetchArticlesListThunk, {
            articlesPage: {
                limit,
                page,
                order,
                sort,
                search,
                category,
            },
        });

        thunk.dispatch.mockReturnValue(
            Promise.resolve({
                unwrap: () => testArticlesListData,
            }),
        );

        const result = await thunk.callThunk({});
        // expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
        //     params: {
        //         _expand: 'user',
        //         _limit: 10,
        //         _page: 1,
        //         _sort: 'title',
        //         _order: 'asc',
        //         q: '',
        //         category: undefined,
        //     },
        // });
        expect(thunk.dispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: expect.stringContaining('getFilteredArticlesQuery'),
                payload: {
                    order,
                    sort: 'created', // The modified sort value after splitting by '_'
                    limit,
                    category: [], // Since category is ALL, it should be empty array
                    query: search,
                    page,
                },
            }),
        );
        if (typeof result !== 'string') {
            expect(result.meta.requestStatus).toBe('fulfilled');
            expect(result.payload).toEqual(testArticlesListData);
        }
    });

    // test('should handle empty response', async () => {
    //     const thunk = new TestAsyncThunk(fetchArticlesListThunk, {
    //         articlesPage: {
    //             limit: 10,
    //             page: 1,
    //             order: 'asc',
    //             sort: ArticleSortField.TITLE_ASC,
    //             search: '',
    //             category: ArticleCategory.ALL,
    //         },
    //     });
    //
    //     thunk.api.get.mockResolvedValue({ data: null });
    //
    //     const result = await thunk.callThunk({});
    //     console.log(result);
    //     // expect(result.meta.requestStatus).toBe('rejected');
    //     expect(result).toBe('No articles found.');
    // });
    //
    // test('should handle different edge cases', async () => {
    //     const thunk = new TestAsyncThunk(fetchArticlesListThunk, {
    //         articlesPage: {
    //             limit: 20,
    //             page: 5,
    //             order: 'desc',
    //             sort: ArticleSortField.CREATED_DESC,
    //             search: 'first',
    //             category: ArticleCategory.IT,
    //         },
    //     });
    //
    //     thunk.api.get.mockResolvedValue({ data: testArticlesListData });
    //
    //     const result = await thunk.callThunk({});
    //     expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
    //         params: {
    //             _expand: 'user',
    //             _limit: 20,
    //             _page: 5,
    //             _sort: 'createdAt',
    //             _order: 'desc',
    //             q: 'first',
    //             category: ArticleCategory.IT,
    //         },
    //     });
    //     if (typeof result !== 'string') {
    //         expect(result.meta.requestStatus).toBe('fulfilled');
    //         expect(result.payload).toEqual(testArticlesListData);
    //     }
    // });
    //
    // test('should handle API error scenario', async () => {
    //     const thunk = new TestAsyncThunk(fetchArticlesListThunk, {
    //         articlesPage: {
    //             limit: 10,
    //             page: 1,
    //             order: 'asc',
    //             sort: ArticleSortField.TITLE_ASC,
    //             search: '',
    //             category: ArticleCategory.ALL,
    //         },
    //     });
    //
    //     const errorMessage = 'Failed to fetch articles.';
    //     thunk.api.get.mockRejectedValue(new Error(errorMessage));
    //
    //     const result = await thunk.callThunk({});
    //     // expect(result.meta.requestStatus).toBe('rejected');
    //     expect(result).toBe(errorMessage);
    // });
});
