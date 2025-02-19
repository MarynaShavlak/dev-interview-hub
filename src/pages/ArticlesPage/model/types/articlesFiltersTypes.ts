import type { Router, StateMapping, UiState } from 'instantsearch.js';

export type RouterProps<TUiState, TRouteState> = {
    router?: Router<TRouteState>;
    stateMapping?: StateMapping<TUiState, TRouteState>;
};
export type ArticlesRouteState = {
    query?: string;
    category?: string;
    sort?: string;
    page?: number;
};

export interface ArticlesUiState extends UiState {
    [indexName: string]: {
        query?: string;
        refinementList?: {
            category?: string[];
        };
        sortBy?: string;
        page?: number;
    };
}
