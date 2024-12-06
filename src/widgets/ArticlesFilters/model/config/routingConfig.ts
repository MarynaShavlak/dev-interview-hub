import { history } from 'instantsearch.js/es/lib/routers';
import {
    ArticlesRouteState,
    ArticlesUiState,
    RouterProps,
} from '../types/articlesFiltersTypes';
import {
    getCategoryName,
    getCategorySlug,
} from '../../lib/utils/categoryUtils/categoryUtils';

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

                return {
                    query: indexUiState.query,
                    category: indexUiState.refinementList?.category
                        ?.map(getCategorySlug)
                        .join('-'),
                    sort: indexUiState.sortBy,
                };
            },
            routeToState(routeState: ArticlesRouteState): ArticlesUiState {
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
                        sortBy: routeState.sort,
                    },
                };
            },
        },
    };
};
