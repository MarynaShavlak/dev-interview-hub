import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { initArticlesPage } from '../../../model/services/initArticlesPage/initArticlesPage';
import { fetchNextArticlesPage } from '../../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { Article } from '@/entities/Article';

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
    const [articles, setArticles] = useState<Article[] | null>([]);

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams))
            .unwrap()
            .then(setArticles)
            .catch((error) =>
                console.error('Failed to initialize articles page:', error),
            );
    });

    const onLoadNextPart = useCallback(() => {
        console.log('load next part');
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    return {
        articles: articles ?? [],
        onLoadNextPart,
    };
};
