import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

/**
 * Selectors for accessing and managing the profile's error state within the Redux store.
 *
 * `useProfileError` - A custom hook that uses the selector to retrieve the profile's error state from the Redux store.
 * @returns - The current error state of the profile, or `undefined` if the error state is not available.
 *
 * `getProfileError` - A selector function that retrieves the profile's error state from the Redux store.
 * @param state - The Redux store's state.
 * @returns - The error state of the profile, or `undefined` if the error state is not available.
 */

export const [useProfileError, getProfileError] = buildSelector(
    (state: StateSchema) => state.profile?.error,
);
