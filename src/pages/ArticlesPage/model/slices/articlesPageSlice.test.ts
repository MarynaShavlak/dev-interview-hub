import { articlesPageActions, articlesPageReducer } from './articlesPageSlice';
import { ArticlesPageSchema } from '../types/articlesPageSchema';
import {
    ArticleSortField,
    ArticleView,
    ArticleCategory,
    Article,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types/sortOrder';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { testArticleData } from '@/entities/Article/testing';

describe('articlesPageSlice tests', () => {
    const initialState: ArticlesPageSchema = {
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ArticleView.GRID,
        page: 1,
        hasMore: true,
        _inited: false,
        limit: 9,
        sort: ArticleSortField.CREATED_ASC,
        search: '',
        order: 'asc',
        category: ArticleCategory.ALL,
        scrollStopArticleIndex: 0,
    };

    test('should return the initial state', () => {
        expect(articlesPageReducer(undefined, { type: '' })).toEqual(
            initialState,
        );
    });

    test('should handle setView action', () => {
        const view = ArticleView.LIST;
        const expectedState = { ...initialState, view };
        expect(
            articlesPageReducer(
                initialState,
                articlesPageActions.setView(view),
            ),
        ).toEqual(expectedState);
    });

    test('should handle setPage action', () => {
        const page = 2;
        const expectedState = { ...initialState, page };
        expect(
            articlesPageReducer(
                initialState,
                articlesPageActions.setPage(page),
            ),
        ).toEqual(expectedState);
    });

    test('should handle setOrder action', () => {
        const order: SortOrder = 'desc';
        const expectedState = { ...initialState, order };
        expect(
            articlesPageReducer(
                initialState,
                articlesPageActions.setOrder(order),
            ),
        ).toEqual(expectedState);
    });

    test('should handle setSort action', () => {
        const sort: ArticleSortField = ArticleSortField.TITLE_ASC;
        const expectedState = { ...initialState, sort };
        expect(
            articlesPageReducer(
                initialState,
                articlesPageActions.setSort(sort),
            ),
        ).toEqual(expectedState);
    });

    test('should handle setCategory action', () => {
        const category: ArticleCategory = ArticleCategory.IT;
        const expectedState = { ...initialState, category };
        expect(
            articlesPageReducer(
                initialState,
                articlesPageActions.setCategory(category),
            ),
        ).toEqual(expectedState);
    });

    test('should handle setSearch action', () => {
        const search = 'new search term';
        const expectedState = { ...initialState, search };
        expect(
            articlesPageReducer(
                initialState,
                articlesPageActions.setSearch(search),
            ),
        ).toEqual(expectedState);
    });

    test('should handle setLimit action', () => {
        const limit = 12;
        const expectedState = { ...initialState, limit };
        expect(
            articlesPageReducer(
                initialState,
                articlesPageActions.setLimit(limit),
            ),
        ).toEqual(expectedState);
    });

    test('should handle setScrollStopArticleIndex action', () => {
        const index = 5;
        const expectedState = {
            ...initialState,
            scrollStopArticleIndex: index,
        };
        expect(
            articlesPageReducer(
                initialState,
                articlesPageActions.setScrollStopArticleIndex(index),
            ),
        ).toEqual(expectedState);
    });

    test('should handle initState action', () => {
        const view = ArticleView.LIST;
        const expectedState = {
            ...initialState,
            view,
            limit: 4,
            _inited: true,
        };
        expect(
            articlesPageReducer(
                initialState,
                articlesPageActions.initState(view),
            ),
        ).toEqual(expectedState);
    });

    test('should handle fetchArticlesList.pending', () => {
        const expectedState = {
            ...initialState,
            isLoading: true,
            error: undefined,
        };
        expect(
            articlesPageReducer(
                initialState,
                fetchArticlesList.pending('', { replace: true }),
            ),
        ).toEqual(expectedState);
    });

    test('should handle fetchArticlesList.fulfilled with replace', () => {
        const articles: Article[] = [
            { ...testArticleData, id: '1' },
            { ...testArticleData, id: '2' },
        ];
        const expectedState = {
            isLoading: false,
            error: undefined,
            ids: ['1', '2'],
            entities: {
                '1': articles[0],
                '2': articles[1],
            },
            view: ArticleView.GRID,
            page: 1,
            hasMore: false,
            _inited: false,
            limit: 9,
            sort: ArticleSortField.CREATED_ASC,
            search: '',
            order: 'asc',
            category: ArticleCategory.ALL,
            scrollStopArticleIndex: 0,
        };
        expect(
            articlesPageReducer(
                initialState,
                fetchArticlesList.fulfilled(articles, '', { replace: true }),
            ),
        ).toEqual(expectedState);
    });

    test('should handle fetchArticlesList.fulfilled with addMany', () => {
        const articles: Article[] = [{ ...testArticleData, id: '1' }];
        const initialStateWithArticles = {
            ...initialState,
            ids: ['2'],
            entities: {
                '2': { ...testArticleData, id: '2' },
            },
        };
        const expectedState = {
            isLoading: false,
            error: undefined,
            ids: ['2', '1'],
            entities: {
                '2': { ...testArticleData, id: '2' },
                '1': articles[0],
            },
            view: ArticleView.GRID,
            page: 1,
            hasMore: false,
            _inited: false,
            limit: 9,
            sort: ArticleSortField.CREATED_ASC,
            search: '',
            order: 'asc',
            category: ArticleCategory.ALL,
            scrollStopArticleIndex: 0,
        };
        expect(
            articlesPageReducer(
                initialStateWithArticles,
                fetchArticlesList.fulfilled(articles, '', { replace: false }),
            ),
        ).toEqual(expectedState);
    });

    test('should handle fetchArticlesList.rejected', () => {
        const error = 'Failed to fetch articles';
        const expectedState = {
            ...initialState,
            isLoading: false,
            error,
        };
        expect(
            articlesPageReducer(
                initialState,
                fetchArticlesList.rejected(new Error(error), '', {}, error),
            ),
        ).toEqual(expectedState);
    });
});
