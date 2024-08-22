import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

/**
 * Selectors for accessing and managing the profile form data within the Redux store.
 *
 * `useProfileForm` - A custom hook that uses the selector to retrieve the profile form data from the Redux store.
 * @returns - The current profile form data, or `undefined` if the form data is not available.
 *
 * `getProfileForm` - A selector function that retrieves the profile form data from the Redux store.
 * @param state - The Redux store's state.
 * @returns - The profile form data, or `undefined` if the form data is not available.
 */

export const [useProfileForm, getProfileForm] = buildSelector(
    (state: StateSchema) => state.profile?.form,
);
