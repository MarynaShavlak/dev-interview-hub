import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

/**
 * Selectors for accessing and managing the profile's readonly state within the Redux store.
 *
 * `useProfileReadonly` - A custom hook that uses the selector to retrieve the profile's readonly state from the Redux store.
 * @returns - The current readonly state of the profile, or `undefined` if the readonly state is not available.
 *
 * `getProfileReadonly` - A selector function that retrieves the profile's readonly state from the Redux store.
 * @param state - The Redux store's state.
 * @returns - The readonly state of the profile, or `undefined` if the readonly state is not available.
 */

export const [useProfileReadonly, getProfileReadonly] = buildSelector(
    (state: StateSchema) => state.profile?.readonly,
);
