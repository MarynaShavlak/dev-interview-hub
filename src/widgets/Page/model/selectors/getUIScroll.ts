import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

/**
 * Selectors for accessing scroll position information within the Redux store.
 *
 * `getUIScroll` - A selector function that retrieves the entire scroll object from the Redux store.
 * @param state - The Redux store's state.
 * @returns - The scroll object containing scroll positions keyed by path.
 *
 * `getUIScrollByPath` - A memoized selector function that retrieves the scroll position for a specific path from the scroll object.
 * @param state - The Redux store's state.
 * @param path - The path for which to retrieve the scroll position.
 * @returns - The scroll position for the specified path, or `0` if the path does not exist in the scroll object.
 */

export const getUIScroll = (state: StateSchema) => state.scroll.scroll;

export const getUIScrollByPath = createSelector(
    getUIScroll,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
);
