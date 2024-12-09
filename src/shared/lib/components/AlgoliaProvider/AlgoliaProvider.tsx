// import { ReactNode } from 'react';
// import { liteClient as algoliasearch } from 'algoliasearch/lite';
// import { InstantSearch, Configure } from 'react-instantsearch-core';
//
// import type { Router, StateMapping } from 'instantsearch.js';
//
// const searchClient = algoliasearch(
//     '6L3XOJ5FZ8', // Application ID
//     '5fac3ea964aecac5d90374450bd541ab', // Search-Only API Key
// );
//
// export type RouterProps<TUiState, TRouteState> = {
//     router?: Router<TRouteState>;
//     stateMapping?: StateMapping<TUiState, TRouteState>;
// };
//
// interface AlgoliaProviderProps {
//     indexName: string;
//     children: ReactNode;
//     // routing: RouterProps<UiState, UiState> | boolean;
//     routing: any;
// }
//
// export const AlgoliaProvider = (props: AlgoliaProviderProps) => {
//     const { indexName, children, routing } = props;
//     return (
//         <InstantSearch
//             searchClient={searchClient}
//             indexName={indexName}
//             routing={routing}
//             future={{
//                 preserveSharedStateOnUnmount: true,
//             }}
//         >
//             <Configure hitsPerPage={200} />
//             {children}
//         </InstantSearch>
//     );
// };

export {};
