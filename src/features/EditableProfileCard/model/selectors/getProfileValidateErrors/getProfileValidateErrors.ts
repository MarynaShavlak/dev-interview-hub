import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

/**
 * Selectors for accessing and managing profile validation errors within the Redux store.
 *
 * `useProfileValidateErrors` - A custom hook that uses the selector to retrieve profile validation errors from the Redux store.
 * @returns - The current validation errors for the profile, or `undefined` if validation errors are not available.
 *
 * `getProfileValidateErrors` - A selector function that retrieves profile validation errors from the Redux store.
 * @param state - The Redux store's state.
 * @returns - The validation errors for the profile, or `undefined` if validation errors are not available.
 */

export const [useProfileValidateErrors, getProfileValidateErrors] =
    buildSelector((state: StateSchema) => state.profile?.validateErrors);
