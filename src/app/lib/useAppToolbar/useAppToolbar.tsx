import { ReactElement } from 'react';
import { AppRoutes } from '@/shared/const/router/router';
import { ScrollToolbar } from '@/widgets/ScrollToolbar';
import { useRouteChange } from '@/shared/lib/router/useRouteChange';
/**
 * Custom hook for conditionally rendering a `ScrollToolbar` component based on the current application route.
 * @returns {ReactElement | undefined} - Returns the toolbar component to be rendered for the current application route, or `undefined` if no toolbar is associated with the route.
 */

export function useAppToolbar() {
    const appRoute = useRouteChange();

    const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
        [AppRoutes.ARTICLES]: <ScrollToolbar page={AppRoutes.ARTICLES} />,
        [AppRoutes.ARTICLE_DETAILS]: (
            <ScrollToolbar page={AppRoutes.ARTICLE_DETAILS} />
        ),
    };

    return toolbarByAppRoute[appRoute];
}
