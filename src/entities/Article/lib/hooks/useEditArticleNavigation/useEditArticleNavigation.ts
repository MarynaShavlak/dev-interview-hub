import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { getRouteArticleEdit } from '@/shared/const/router/router';

export const useEditArticleNavigation = () => {
    const navigate = useNavigate();

    const navigateToEditArticle = useCallback(
        (articleId: string) => {
            navigate(getRouteArticleEdit(articleId));
        },
        [navigate],
    );

    return { navigateToEditArticle };
};
