import { history } from 'instantsearch.js/es/lib/routers';

import {
    getCategoryFromUrl,
    getCategorySlug,
} from '../../lib/utilities/categoryUtils/categoryUtils';
import {
    ArticlesRouteState,
    ArticlesUiState,
    RouterProps,
} from '../types/articlesFiltersTypes';

export const createRoutingConfig = (
    indexName: string,
): RouterProps<ArticlesUiState, ArticlesRouteState> => {
    return {
        router: history({
            cleanUrlOnDispose: true,
            // writeDelay: 400,
            // windowTitle(routeState) {
            //     const { query, category, sort } = routeState;
            //
            //     if (!query && !category && !sort) {
            //         return 'Articles';
            //     }
            //
            //     const filters = [
            //         query,
            //         category,
            //         extractSortType((sort as ArticleSortType) || ''),
            //         extractSortOrder((sort as ArticleSortType) || ''),
            //     ]
            //         .filter(Boolean)
            //         .join(', ');
            //
            // },
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
                    // || ArticleSortField.CREATED_ASC
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
                        sortBy: routeState.sort,
                        // || ArticleSortField.CREATED_ASC
                        page: routeState.page,
                    },
                };
            },
        },
    };
};
