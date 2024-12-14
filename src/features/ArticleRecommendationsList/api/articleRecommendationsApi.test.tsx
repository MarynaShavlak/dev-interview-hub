export {};

// import fetchMock from 'jest-fetch-mock';
// import { Provider } from 'react-redux';
// import { renderHook, waitFor } from '@testing-library/react';
// import { ReactNode } from 'react';
// import { ArticleCategory, Article } from '@/entities/Article';
// import { setupApiStore } from '@/shared/lib/tests/rtkQueryTests/setupApiStore/setupApiStore';
// import {
//     recommendationsApi,
//     useArticleRecommendationsList,
// } from './articleRecommendationsApi';
// import { testArticlesListData } from '@/entities/Article/testing';
//
// beforeEach(() => {
//     fetchMock.resetMocks();
// });
//
// interface wrapperProps {
//     children: ReactNode;
// }
//
// const wrapper = ({ children }: wrapperProps) => {
//     const storeRef = setupApiStore(recommendationsApi);
//     return <Provider store={storeRef.store}>{children}</Provider>;
// };
//
// describe('useArticleRecommendationsList', () => {
//     const mockArticles: Article[] = testArticlesListData;
//
//     const params = {
//         limit: 5,
//         category: ArticleCategory.IT,
//         exceptArticleId: '123',
//     };
//
//     test('should fetch and return article recommendations successfully', async () => {
//         fetchMock.mockResponse(JSON.stringify(mockArticles));
//
//         const { result } = renderHook(
//             () => useArticleRecommendationsList(params),
//             { wrapper },
//         );
//
//         // Initial state
//         expect(result.current.isLoading).toBe(true);
//         expect(result.current.data).toBeUndefined();
//
//         await waitFor(() => {
//             expect(result.current.isLoading).toBe(false);
//             expect(result.current.isSuccess).toBe(true);
//             expect(result.current.data).toEqual(mockArticles);
//         });
//     });
//
//     test('should handle error when fetching article recommendations', async () => {
//         fetchMock.mockReject(new Error('Network Error'));
//
//         const { result } = renderHook(
//             () => useArticleRecommendationsList(params),
//             { wrapper },
//         );
//
//         expect(result.current.isLoading).toBe(true);
//         expect(result.current.data).toBeUndefined();
//
//         await waitFor(() => {
//             const { isLoading, isError, status } = result.current;
//             expect(isLoading).toBe(false);
//             expect(isError).toBe(true);
//             expect(status).toBe('rejected');
//
//             expect(fetchMock).toHaveBeenCalledTimes(1);
//         });
//     });
// });
