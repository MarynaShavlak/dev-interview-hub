import { initArticlesPage } from './initArticlesPage';

import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import {
    ArticleCategory,
    ArticleSortField,
    ArticleView,
} from '@/entities/Article';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

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
    });

    test('should initialize page and fetch articles when not already inited', async () => {
        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesPage: {
                _inited: false,
            },
        });

        localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, ArticleView.GRID);
        expect(localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY)).toEqual(
            ArticleView.GRID,
        );

        const searchParams = new URLSearchParams({
            order: 'asc',
            sort: ArticleSortField.TITLE_ASC,
            search: 'test',
            category: ArticleCategory.IT,
        });

        await thunk.callThunk(searchParams);

        expect(thunk.dispatch).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledWith(
            articlesPageActions.setOrder('asc'),
        );
        expect(thunk.dispatch).toHaveBeenCalledWith(
            articlesPageActions.setSort(ArticleSortField.TITLE_ASC),
        );
        expect(thunk.dispatch).toHaveBeenCalledWith(
            articlesPageActions.setSearch('test'),
        );
        expect(thunk.dispatch).toHaveBeenCalledWith(
            articlesPageActions.setCategory(ArticleCategory.IT),
        );
        expect(thunk.dispatch).toHaveBeenCalledWith(
            articlesPageActions.initState(ArticleView.GRID),
        );
        expect(thunk.dispatch).toHaveBeenCalledWith(expect.any(Function));
    });

    test('should not dispatch any actions if the page is already initialized', async () => {
        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesPage: {
                _inited: true,
            },
        });

        await thunk.callThunk(new URLSearchParams());

        expect(thunk.dispatch).toBeCalledTimes(2);
    });
});
