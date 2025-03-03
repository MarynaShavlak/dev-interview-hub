import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchNextArticlesPage } from './fetchNextArticlesPage';
// import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../slices/articlesPageSlice';

jest.mock(
    '@/pages/ArticlesPage/model/services/fetchArticlesListThunk/fetchArticlesListThunk',
);

describe('async thunk fetchNextArticlesPage test', () => {
    test('successfully fetches the next page', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: 2,
                // ids: [],
                // entities: {},
                limit: 5,
                isLoading: false,
                hasMore: true,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(4);
        expect(thunk.dispatch).toHaveBeenCalledWith(
            articlesPageActions.setPage(3),
        );
        // expect(fetchArticlesList).toHaveBeenCalled();
    });

    test('does not fetch when hasMore is false', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: 2,
                // ids: [],
                // entities: {},
                limit: 5,
                isLoading: false,
                hasMore: false,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);
        // expect(fetchArticlesList).not.toHaveBeenCalled();
        expect(thunk.dispatch).not.toHaveBeenCalledWith(
            articlesPageActions.setPage(expect.any(Number)),
        );
    });

    test('does not fetch when isLoading is true', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: 2,
                // ids: [],
                // entities: {},
                limit: 5,
                isLoading: true,
                hasMore: true,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);
        // expect(fetchArticlesList).not.toHaveBeenCalled();
        expect(thunk.dispatch).not.toHaveBeenCalledWith(
            articlesPageActions.setPage(expect.any(Number)),
        );
    });

    test('increments page number correctly', async () => {
        const initialPage = 3;
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: initialPage,
                // ids: [],
                // entities: {},
                limit: 5,
                isLoading: false,
                hasMore: true,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toHaveBeenCalledWith(
            articlesPageActions.setPage(initialPage + 1),
        );
        // expect(fetchArticlesList).toHaveBeenCalled();
    });

    test('handles edge case where hasMore is undefined', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: 2,
                // ids: [],
                // entities: {},
                limit: 5,
                isLoading: false,
                hasMore: undefined,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);
        // expect(fetchArticlesList).not.toHaveBeenCalled();
    });
});
