import { useEffect, useState } from 'react';
import { Article } from '@/entities/Article';

/**
 * Custom hook to determine if no articles are found based on loading state and article list.
 *
 * This hook is useful for conditionally rendering a "No Articles Found" message or similar UI elements when there are no articles to display and the loading process is complete.
 *
 * @param {boolean} [isLoading] - Optional boolean indicating if articles are currently being loaded. Defaults to `false`.
 * @param {Article[]} [articles] - Optional array of articles. Defaults to an empty array.
 *
 * @returns {boolean} `true` if there are no articles and loading is complete; otherwise, `false`.
 *
 */

export const useNoArticlesFound = (
    isLoading?: boolean,
    articles: Article[] = [],
) => {
    const [isLoadComplete, setIsLoadComplete] = useState(false);

    useEffect(() => {
        if (isLoading === false && articles.length > 0) {
            setIsLoadComplete(true);
        }
    }, [isLoading, articles]);
    return !articles.length && !isLoading && isLoadComplete;
};
