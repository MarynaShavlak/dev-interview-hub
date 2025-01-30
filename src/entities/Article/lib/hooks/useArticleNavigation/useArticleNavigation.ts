import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { getRouteArticleDetails } from '@/shared/const/router/router';

export const useArticleNavigation = () => {
    const navigate = useNavigate();

    const navigateToArticle = useCallback(
        (articleId: string) => {
            navigate(getRouteArticleDetails(articleId));
        },
        [navigate],
    );

    return { navigateToArticle };
};
