import { history } from 'instantsearch.js/es/lib/routers';

import {
    getCategoryName,
    getCategorySlug,
} from '../../lib/utils/categoryUtils/categoryUtils';
import {
    ArticlesRouteState,
    ArticlesUiState,
    RouterProps,
} from '../../articlesFiltersTypes';
import { ArticleSortField } from '@/entities/Article';

export const createRoutingConfig = (
    indexName: string,
): RouterProps<ArticlesUiState, ArticlesRouteState> => {
    return {
        router: history({
            cleanUrlOnDispose: true,
        }),
        stateMapping: {
            stateToRoute(uiState: ArticlesUiState): ArticlesRouteState {
                const indexUiState = uiState[indexName] || {};
                console.log('indexUiState', indexUiState);
                return {
                    query: indexUiState.query,
                    category: indexUiState.refinementList?.category
                        ?.map(getCategorySlug)
                        .join('-'),
                    sort: indexUiState.sortBy || ArticleSortField.CREATED_ASC,
                };
            },
            routeToState(routeState: ArticlesRouteState): ArticlesUiState {
                console.log('routeState', routeState);
                console.log('routeState.sort', routeState.sort);
                return {
                    [indexName]: {
                        query: routeState.query || '',
                        refinementList: {
                            category: routeState.category
                                ? routeState.category
                                      .split('-')
                                      .map(getCategoryName)
                                : [],
                        },
                        sortBy: routeState.sort || ArticleSortField.CREATED_ASC,
                    },
                };
            },
        },
    };
};
