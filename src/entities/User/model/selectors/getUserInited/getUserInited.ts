import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

/**
 * Selectors for accessing and managing the user initialization status within the Redux store.
 *
 * `useUserInited` - A custom hook that uses the selector to retrieve the user initialization status from the Redux store.
 * @returns - The current user initialization status from the store.
 *
 * `getUserInited` - A selector function that retrieves the user initialization status from the Redux store.
 * @param state - The Redux store's state.
 * @returns - The user initialization status from the store.
 */

export const [useUserInited, getUserInited] = buildSelector(
    (state: StateSchema) => state.user._inited,
);
