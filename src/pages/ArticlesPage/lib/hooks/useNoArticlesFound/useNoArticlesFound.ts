import { useEffect, useState } from 'react';
import { Article } from '../../../../../entities/Article/model/types/article';

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
