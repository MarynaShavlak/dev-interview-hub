import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { initArticlesPage } from './initArticlesPage';
import { shouldDoActionForRedesignUi } from '@/shared/lib/features';
import { ArticleCategory, ArticleView } from '@/entities/Article';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { ERROR_ARTICLES_PAGE_MESSAGES } from '../../consts/errorArticlesPageMessages';
import * as fetchArticlesListModule from '../fetchArticlesListThunk/fetchArticlesListThunk';

jest.mock('@/shared/lib/features');

const localStorageMock = (() => {
    let store: { [key: string]: string } = {};

    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value;
        },
        clear: () => {
            store = {};
        },
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

describe('initArticlesPage thunk', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.restoreAllMocks();
        jest.mocked(shouldDoActionForRedesignUi).mockReset();
    });

    test('should not dispatch any actions if the page is already initialized', async () => {
        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesPage: {
                _inited: true,
            },
        });

        await thunk.callThunk(new URLSearchParams());

        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(thunk.api.get).not.toHaveBeenCalled();
    });

    test('should set localStorage view when available', async () => {
        localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, ArticleView.GRID);

        jest.mocked(shouldDoActionForRedesignUi).mockReturnValue(false);

        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesPage: {
                _inited: false,
            },
        });

        await thunk.callThunk(new URLSearchParams());

        expect(thunk.dispatch).toBeCalledWith(
            articlesPageActions.initState(ArticleView.GRID),
        );
        expect(thunk.dispatch).not.toBeCalledWith(expect.any(Function)); // fetchArticlesListThunk not called
        expect(thunk.dispatch).toBeCalledTimes(3); // Initial dispatch, initState, fulfilled action
    });

    test('should fetch articles list when shouldDoActionForRedesignUi returns true', async () => {
        // Set the mock return value before using the function
        jest.mocked(shouldDoActionForRedesignUi).mockReturnValue(true);

        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesPage: {
                _inited: false,
            },
        });
        const dispatchSpy = jest.spyOn(thunk, 'dispatch');

        await thunk.callThunk(new URLSearchParams());
        expect(dispatchSpy).toHaveBeenCalled();
        const anyThunkDispatched = dispatchSpy.mock.calls.some(
            ([action]) => typeof action === 'function',
        );

        expect(anyThunkDispatched).toBeTruthy();
    });

    test('should not fetch articles list when shouldDoActionForRedesignUi returns false', async () => {
        jest.mocked(shouldDoActionForRedesignUi).mockReturnValue(false);

        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesPage: {
                _inited: false,
            },
        });

        await thunk.callThunk(new URLSearchParams());

        const actions = thunk.dispatch.mock.calls.map((call) => call[0]);
        const fetchArticlesAction = actions.find(
            (action) =>
                typeof action === 'function' &&
                action.toString().includes('fetchArticlesListThunk'),
        );

        expect(fetchArticlesAction).toBeFalsy();
    });

    test('should handle errors correctly', async () => {
        const errorMessage = 'Test error';
        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesPage: {
                _inited: false,
            },
        });

        // Mock shouldDoActionForRedesignUi to return true so fetchArticlesListThunk is called
        jest.mocked(shouldDoActionForRedesignUi).mockReturnValue(true);

        jest.spyOn(
            fetchArticlesListModule,
            'fetchArticlesListThunk',
        ).mockImplementation(() => {
            throw new Error(errorMessage);
        });

        // Call the thunk and capture the returned value
        const result = await thunk.callThunk(new URLSearchParams());

        // Expect the result to contain the predefined error message
        expect(result).toEqual(
            expect.stringContaining(ERROR_ARTICLES_PAGE_MESSAGES.INIT_ERROR),
        );

        // Check that dispatch was called at least for initState and the fetch attempt
        expect(thunk.dispatch).toHaveBeenCalled();
        expect(thunk.api.get).not.toHaveBeenCalled();
    });

    test('should initialize state with URL search params and localStorage view', async () => {
        localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, ArticleView.LIST);
        jest.mocked(shouldDoActionForRedesignUi).mockReturnValue(false);

        const searchParams = new URLSearchParams({
            order: 'desc',
            sort: 'views',
            query: 'test search',
            category: 'IT',
        });

        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesPage: {
                _inited: false,
            },
        });

        await thunk.callThunk(searchParams);

        expect(thunk.dispatch).toHaveBeenCalledWith(
            articlesPageActions.setOrder('desc'),
        );
        expect(thunk.dispatch).toHaveBeenCalledWith(
            articlesPageActions.setSort('views'),
        );
        expect(thunk.dispatch).toHaveBeenCalledWith(
            articlesPageActions.setSearch('test search'),
        );
        expect(thunk.dispatch).toHaveBeenCalledWith(
            articlesPageActions.setCategory(ArticleCategory.IT),
        );
        expect(thunk.dispatch).toHaveBeenCalledWith(
            articlesPageActions.initState(ArticleView.LIST),
        );
        expect(thunk.dispatch).toBeCalledTimes(7); // 5 actions + pending+fulfilled
    });

    test('should handle invalid localStorage view value gracefully', async () => {
        localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, 'INVALID_VIEW');
        jest.mocked(shouldDoActionForRedesignUi).mockReturnValue(false);

        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesPage: {
                _inited: false,
            },
        });

        await thunk.callThunk(new URLSearchParams());

        expect(thunk.dispatch).toHaveBeenCalledWith(
            articlesPageActions.initState('INVALID_VIEW' as ArticleView), // Will pass through as-is
        );
        expect(thunk.dispatch).toBeCalledTimes(3);
    });
});
