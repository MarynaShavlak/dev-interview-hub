import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

/**
 * Selectors for accessing and managing the profile's data within the Redux store.
 *
 * `useProfileData` - A custom hook that uses the selector to retrieve the profile's data from the Redux store.
 * @returns - The current profile data, or `undefined` if the data is not available.
 *
 * `getProfileData` - A selector function that retrieves the profile's data from the Redux store.
 * @param state - The Redux store's state.
 * @returns - The profile data, or `undefined` if the data is not available.
 */

export const [useProfileData, getProfileData] = buildSelector(
    (state: StateSchema) => state.profile?.data,
);
