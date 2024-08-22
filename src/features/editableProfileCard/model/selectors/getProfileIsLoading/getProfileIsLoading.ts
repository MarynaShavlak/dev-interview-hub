import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

/**
 * Selectors for accessing and managing the loading state of the profile within the Redux store.
 *
 * `useProfileIsLoading` - A custom hook that uses the selector to retrieve the profile's loading state from the Redux store.
 * @returns - The current loading state of the profile, or `undefined` if the loading state is not available.
 *
 * `getProfileIsLoading` - A selector function that retrieves the profile's loading state from the Redux store.
 * @param state - The Redux store's state.
 * @returns - The loading state of the profile, or `undefined` if the loading state is not available.
 */

export const [useProfileIsLoading, getProfileIsLoading] = buildSelector(
    (state: StateSchema) => state.profile?.isLoading,
);
