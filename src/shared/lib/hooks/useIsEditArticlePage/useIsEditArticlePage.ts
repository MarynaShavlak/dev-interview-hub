import { useLocation } from 'react-router-dom';

export const useIsEditArticlePage = (): boolean => {
    const location = useLocation();
    const isEditArticlePage = /^\/article\/[^/]+\/edit$/.test(
        location.pathname,
    );

    return isEditArticlePage;
};
