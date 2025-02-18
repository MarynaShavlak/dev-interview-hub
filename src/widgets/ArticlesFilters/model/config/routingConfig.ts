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
import { SortOrder } from '@/shared/types/sortOrder';

export const createRoutingConfig = (
    indexName: string,
    order: SortOrder,
): RouterProps<ArticlesUiState, ArticlesRouteState> => {
    console.log('indexName__createRoutingConfig', indexName);
    console.log('order__createRoutingConfig', order);
    const index = `articles_${indexName}_${order}` as ArticleSortField;
    console.log('index__createRoutingConfig', index);
    return {
        router: history({
            cleanUrlOnDispose: true,
        }),
        stateMapping: {
            stateToRoute(uiState: ArticlesUiState): ArticlesRouteState {
                const indexUiState = uiState[indexName] || {};
                // console.log('indexUiState', indexUiState);
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
                console.log('routeState.category', routeState.category);
                // console.log('routeState.sort', routeState.sort);
                return {
                    [indexName]: {
                        query: routeState.query || '',
                        refinementList: {
                            category:
                                routeState.category === 'ALL'
                                    ? []
                                    : routeState.category
                                      ? routeState.category
                                            .split('-')
                                            .map(getCategoryName)
                                      : [],
                        },
                        sortBy: routeState.sort || ArticleSortField.CREATED_ASC,
                        page: routeState.page,
                    },
                };
            },
        },
    };
};
