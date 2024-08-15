import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { initArticlesPage } from '../../../model/services/initArticlesPage/initArticlesPage';
import { fetchNextArticlesPage } from '../../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';

/**
 * Custom hook for managing the initialization and loading of articles on a page.
 *
 * @returns {{
 *    onLoadNextPart: () => void;
 *    searchParams: URLSearchParams;
 *  }} An object with the following properties:
 *  * `onLoadNextPart`: Function to load the next page of articles when the user scrolls to the end.
 *  * `searchParams`: The current URL search parameters used for initializing the articles page or filtering articles.
 *
 */

export const useArticleListFetcher = () => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    // Initialize articles page on component mount
    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    return {
        onLoadNextPart,
    };
};
