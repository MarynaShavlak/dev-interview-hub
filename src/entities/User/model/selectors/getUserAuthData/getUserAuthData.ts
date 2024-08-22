import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

/**
 * Selectors for accessing and managing the user authentication data within the Redux store.
 *
 * `useUserAuthData` - A custom hook that uses the selector to retrieve the user authentication data from the Redux store.
 * @returns - The current user authentication data from the store.
 *
 * `getUserAuthData` - A selector function that retrieves the user authentication data from the Redux store.
 * @param state - The Redux store's state.
 * @returns - The user authentication data from the store.
 */

export const [useUserAuthData, getUserAuthData] = buildSelector(
    (state: StateSchema) => state.user.authData,
);
