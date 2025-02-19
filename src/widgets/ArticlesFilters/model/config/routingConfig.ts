import { history } from 'instantsearch.js/es/lib/routers';

import {
    getCategoryFromUrl,
    getCategorySlug,
} from '../../lib/utils/categoryUtils/categoryUtils';
import {
    ArticlesRouteState,
    ArticlesUiState,
    RouterProps,
} from '../types/articlesFiltersTypes';
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

                return {
                    query: indexUiState.query,
                    category: indexUiState.refinementList?.category
                        ?.map(getCategorySlug)
                        .join('-'),
                    sort: indexUiState.sortBy || ArticleSortField.CREATED_ASC,
                    page: indexUiState.page,
                };
            },
            routeToState(routeState: ArticlesRouteState): ArticlesUiState {
                return {
                    [indexName]: {
                        query: routeState.query || '',
                        refinementList: {
                            category: getCategoryFromUrl(routeState),
                        },
                        sortBy: routeState.sort || ArticleSortField.CREATED_ASC,
                        page: routeState.page,
                    },
                };
            },
        },
    };
};
