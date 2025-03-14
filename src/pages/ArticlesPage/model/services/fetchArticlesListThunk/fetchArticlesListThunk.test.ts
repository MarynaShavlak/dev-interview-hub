import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticlesListThunk } from './fetchArticlesListThunk';
import { testArticlesListData } from '@/entities/Article/testing';
import {
    Article,
    ArticleCategory,
    getFilteredArticlesQuery,
} from '@/entities/Article';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';
import { ERROR_ARTICLES_PAGE_MESSAGES } from '../../consts/errorArticlesPageMessages';

jest.mock('@/entities/Article', () => ({
    ...jest.requireActual('@/entities/Article'),
    getFilteredArticlesQuery: jest.fn(),
}));

jest.mock('@/shared/lib/firestore', () => ({
    ...jest.requireActual('@/shared/lib/firestore'),
    handleThunkErrorMessage: jest.fn(),
}));

const getDefaultState = (overrides = {}) => ({
    articlesPage: {
        limit: 10,
        page: 1,
        order: 'asc' as const,
        sort: 'title' as const,
        search: '',
        category: ArticleCategory.ALL,
        ...overrides, // Allow customization
    },
});

const createThunk = (stateOverrides = {}) =>
    new TestAsyncThunk(fetchArticlesListThunk, getDefaultState(stateOverrides));

const mockQueryAndDispatch = (data: Article[] | Error) => {
    (getFilteredArticlesQuery as jest.Mock).mockReturnValue({
        type: 'getFilteredArticlesQuery',
        payload: undefined,
    });

    const unwrapMock = jest.fn();
    if (data instanceof Error) {
        unwrapMock.mockRejectedValue(data);
        (handleThunkErrorMessage as jest.Mock).mockReturnValue(
            ERROR_ARTICLES_PAGE_MESSAGES.ARTICLES_FETCH_FAIL,
        );
    } else {
        unwrapMock.mockResolvedValue(data);
    }

    return { unwrapMock, dispatchResult: { unwrap: unwrapMock } };
};

describe('async thunk fetchArticlesListThunk test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('should fetch articles list successfully', async () => {
        const thunk = createThunk();
        const { unwrapMock, dispatchResult } =
            mockQueryAndDispatch(testArticlesListData);

        thunk.dispatch.mockReturnValue(dispatchResult);

        const result = await thunk.callThunk({});

        expect(getFilteredArticlesQuery).toHaveBeenCalledWith({
            order: 'asc',
            sort: 'title',
            limit: 10,
            category: [],
            query: '',
            page: 1,
        });

        expect(unwrapMock).toHaveBeenCalled();
        if (typeof result !== 'string') {
            expect(result.meta.requestStatus).toBe('fulfilled');
            expect(result.payload).toEqual(testArticlesListData);
        }
    });

    test('should handle empty response', async () => {
        const thunk = createThunk();
        const { unwrapMock, dispatchResult } = mockQueryAndDispatch([]);

        thunk.dispatch.mockReturnValue(dispatchResult);

        const result = await thunk.callThunk({});

        expect(getFilteredArticlesQuery).toHaveBeenCalledWith({
            order: 'asc',
            sort: 'title',
            limit: 10,
            category: [],
            query: '',
            page: 1,
        });

        expect(unwrapMock).toHaveBeenCalled();

        if (typeof result !== 'string') {
            expect(result.meta.requestStatus).toBe('fulfilled');
            expect(result.payload).toEqual([]);
            expect(result.payload?.length).toBe(0);
        }
    });

    it.each([
        [
            {
                page: 5,
                limit: 20,
                order: 'desc',
                sort: 'views',
                search: 'some query',
                category: ArticleCategory.REACT,
            },
            testArticlesListData,
        ],
        [
            {
                page: 2,
                limit: 15,
                order: 'asc',
                sort: 'subtitle',
                search: 'redux',
                category: ArticleCategory.HTML,
            },
            [],
        ],
    ])(
        'should handle different scenarios: %o',
        async (stateOverrides, expectedData) => {
            const thunk = createThunk(stateOverrides);
            const { unwrapMock, dispatchResult } =
                mockQueryAndDispatch(expectedData);

            thunk.dispatch.mockReturnValue(dispatchResult);
            const result = await thunk.callThunk({});

            expect(getFilteredArticlesQuery).toHaveBeenCalled();
            expect(unwrapMock).toHaveBeenCalled();
            if (typeof result !== 'string') {
                expect(result.meta.requestStatus).toBe('fulfilled');
                expect(result.payload).toEqual(expectedData);
            }
        },
    );

    it.each([[new Error('API error'), 'Failed to fetch articles.']])(
        'should handle errors: %o',
        async (error, expectedMessage) => {
            const thunk = createThunk();
            const { unwrapMock, dispatchResult } = mockQueryAndDispatch(error);

            thunk.dispatch.mockReturnValue(dispatchResult);
            const result = await thunk.callThunk({});

            expect(getFilteredArticlesQuery).toHaveBeenCalled();
            expect(unwrapMock).toHaveBeenCalled();
            expect(handleThunkErrorMessage).toHaveBeenCalledWith(
                error,
                ERROR_ARTICLES_PAGE_MESSAGES.ARTICLES_FETCH_FAIL,
            );
            expect(result).toBe(expectedMessage);
        },
    );
});
