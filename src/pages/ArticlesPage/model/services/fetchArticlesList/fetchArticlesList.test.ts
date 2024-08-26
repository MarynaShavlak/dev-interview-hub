import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticlesList } from './fetchArticlesList';
import { ArticleCategory, ArticleSortField } from '@/entities/Article';
import { testArticlesListData } from '@/entities/Article/testing';

describe('async thunk fetchArticlesList test', () => {
    test('should fetch articles list successfully', async () => {
        const thunk = new TestAsyncThunk(fetchArticlesList, {
            articlesPage: {
                limit: 10,
                page: 1,
                order: 'asc',
                sort: ArticleSortField.TITLE,
                search: '',
                category: ArticleCategory.ALL,
            },
        });

        thunk.api.get.mockReturnValue(
            Promise.resolve({ data: testArticlesListData }),
        );

        const result = await thunk.callThunk({});
        expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
            params: {
                _expand: 'user',
                _limit: 10,
                _page: 1,
                _sort: 'title',
                _order: 'asc',
                q: '',
                category: undefined,
            },
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(testArticlesListData);
    });

    test('should handle empty response', async () => {
        const thunk = new TestAsyncThunk(fetchArticlesList, {
            articlesPage: {
                limit: 10,
                page: 1,
                order: 'asc',
                sort: ArticleSortField.TITLE,
                search: '',
                category: ArticleCategory.ALL,
            },
        });

        thunk.api.get.mockResolvedValue({ data: null });

        const result = await thunk.callThunk({});
        console.log(result);
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('No articles found.');
    });

    test('should handle different edge cases', async () => {
        const thunk = new TestAsyncThunk(fetchArticlesList, {
            articlesPage: {
                limit: 20,
                page: 5,
                order: 'desc',
                sort: ArticleSortField.CREATED,
                search: 'first',
                category: ArticleCategory.IT,
            },
        });

        thunk.api.get.mockResolvedValue({ data: testArticlesListData });

        const result = await thunk.callThunk({});
        expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
            params: {
                _expand: 'user',
                _limit: 20,
                _page: 5,
                _sort: 'createdAt',
                _order: 'desc',
                q: 'first',
                category: ArticleCategory.IT,
            },
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(testArticlesListData);
    });

    test('should handle API error scenario', async () => {
        const thunk = new TestAsyncThunk(fetchArticlesList, {
            articlesPage: {
                limit: 10,
                page: 1,
                order: 'asc',
                sort: ArticleSortField.TITLE,
                search: '',
                category: ArticleCategory.ALL,
            },
        });

        const errorMessage = 'Failed to fetch articles.';
        thunk.api.get.mockRejectedValue(new Error(errorMessage));

        const result = await thunk.callThunk({});
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe(errorMessage);
    });
});
