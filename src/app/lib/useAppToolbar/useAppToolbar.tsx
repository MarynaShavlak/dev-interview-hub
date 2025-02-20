import { ReactElement } from 'react';
import { AppRoutes } from '@/shared/const/router/router';
import { ScrollToolbar } from '@/widgets/ScrollToolbar';
import { useRouteChange } from '@/shared/lib/router/useRouteChange';
/**
 * Custom hook for conditionally rendering a `ScrollToolbar` component based on the current application route.
 * @returns {ReactElement | undefined} - Returns the toolbar component to be rendered for the current application route, or `undefined` if no toolbar is associated with the route.
 */

export const useAppToolbar = () => {
    const appRoute = useRouteChange();

    const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
        [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
        [AppRoutes.ARTICLES]: <ScrollToolbar />,
        [AppRoutes.ADMIN_PANEL]: <ScrollToolbar />,
        [AppRoutes.ARTICLE_CREATE]: <ScrollToolbar />,
        [AppRoutes.ARTICLE_EDIT]: <ScrollToolbar />,
    };

    return toolbarByAppRoute[appRoute];
};
