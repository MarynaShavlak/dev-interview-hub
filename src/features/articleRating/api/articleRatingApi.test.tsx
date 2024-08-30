import fetchMock from 'jest-fetch-mock';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import {
    articleRatingApi,
    useGetArticleRating,
    useRateArticle,
} from './articleRatingApi';
import { setupApiStore } from '@/shared/lib/tests/rtkQueryTests/setupApiStore/setupApiStore';
import { testRatingsData } from '@/entities/Rating/testing';
import { RatingType } from '@/entities/Rating';

beforeEach(() => {
    fetchMock.resetMocks();
});

interface wrapperProps {
    children: ReactNode;
}
const updateTimeout = 5000;

const wrapper = ({ children }: wrapperProps) => {
    const storeRef = setupApiStore(articleRatingApi);
    return <Provider store={storeRef.store}>{children}</Provider>;
};

describe('getArticleRating', () => {
    const rateArgs = {
        userId: '123',
        articleId: '456',
    };
    test('should make correct request', async () => {
        const storeRef = setupApiStore(articleRatingApi);
        fetchMock.mockResponse(JSON.stringify([]));
        // @ts-ignore
        await storeRef.store.dispatch<any>(
            articleRatingApi.endpoints.getArticleRating.initiate(rateArgs),
        );

        expect(fetchMock).toBeCalledTimes(1);
        const { method, headers, url } = fetchMock.mock.calls[0][0] as Request;
        expect(method).toBe('GET');
        expect(url).toBe(`${__API__}/article-ratings?userId=123&articleId=456`);
        expect(headers.get('Authorization')).toBeNull();
    });

    test('should handle successful response', async () => {
        const storeRef = setupApiStore(articleRatingApi);
        const mockResponse: RatingType[] = testRatingsData;
        fetchMock.mockResponse(JSON.stringify(mockResponse));
        // @ts-ignore
        const action = await storeRef.store.dispatch<any>(
            articleRatingApi.endpoints.getArticleRating.initiate(rateArgs),
        );

        const { status, data, isSuccess } = action;
        expect(status).toBe('fulfilled');
        expect(isSuccess).toBe(true);
        expect(data).toStrictEqual(mockResponse);
    });

    test('should handle unsuccessful response', async () => {
        const storeRef = setupApiStore(articleRatingApi);
        fetchMock.mockReject(new Error('Internal server error'));

        // @ts-ignore
        const action = await storeRef.store.dispatch<any>(
            articleRatingApi.endpoints.getArticleRating.initiate({
                userId: '123',
                articleId: '456',
            }),
        );

        const {
            status,
            error: { error },
            isError,
        } = action;
        expect(status).toBe('rejected');
        expect(isError).toBe(true);
        expect(error).toBe('Error: Internal server error');
    });
});

describe('useGetArticleRating', () => {
    const rateArgs = {
        userId: '123',
        articleId: '456',
    };
    test('should handle successful response', async () => {
        const mockResponse: RatingType[] = testRatingsData;
        fetchMock.mockResponse(JSON.stringify(mockResponse));
        // @ts-ignore

        const { result } = renderHook(() => useGetArticleRating(rateArgs), {
            wrapper,
        });
        const initialResponse = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(true);
        await waitFor(
            () => {
                const nextResponse = result.current;
                expect(nextResponse.data).not.toBeUndefined();
                expect(nextResponse.isLoading).toBe(false);
                expect(nextResponse.isSuccess).toBe(true);
            },
            { timeout: updateTimeout },
        );
    });

    test('should handle internal server error', async () => {
        fetchMock.mockReject(new Error('Error: Internal server error'));

        const { result } = renderHook(() => useGetArticleRating(rateArgs), {
            wrapper,
        });
        const initialResponse = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(true);

        await waitFor(
            () => {
                const nextResponse = result.current;
                expect(nextResponse.data).toBeUndefined();
                expect(nextResponse.isLoading).toBe(false);
                expect(nextResponse.isError).toBe(true);
            },
            { timeout: updateTimeout },
        );
    });
});

describe('useRateArticle', () => {
    const newRatingData = {
        userId: '123',
        articleId: '456',
        rate: 4,
        feedback: 'Good article!',
    };
    test('should handle successful response', async () => {
        fetchMock.mockResponse(JSON.stringify(undefined));
        const { result } = renderHook(() => useRateArticle(undefined), {
            wrapper,
        });

        const [rateArticle, initialResponse] = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(false);

        act(() => {
            rateArticle(newRatingData);
        });

        const loadingResponse = result.current[1];
        expect(loadingResponse.data).toBeUndefined();
        expect(loadingResponse.isLoading).toBe(true);

        await waitFor(
            () => {
                const loadedResponse = result.current[1];
                expect(loadedResponse.data).not.toBeUndefined();
                expect(loadedResponse.isLoading).toBe(false);
                expect(loadedResponse.isSuccess).toBe(true);
            },
            { timeout: updateTimeout },
        );
    });

    test('should handle internal server error', async () => {
        fetchMock.mockReject(new Error('Error: Internal server error'));
        const { result } = renderHook(() => useRateArticle(undefined), {
            wrapper,
        });
        const [rateArticle, initialResponse] = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(false);

        act(() => {
            rateArticle(newRatingData);
        });

        const loadingResponse = result.current[1];
        expect(loadingResponse.data).toBeUndefined();
        expect(loadingResponse.isLoading).toBe(true);

        await waitFor(
            () => {
                const loadedResponse = result.current[1];
                expect(loadedResponse.data).toBeUndefined();
                expect(loadedResponse.isLoading).toBe(false);
                expect(loadedResponse.isError).toBe(true);
            },
            { timeout: updateTimeout },
        );
    });
});
