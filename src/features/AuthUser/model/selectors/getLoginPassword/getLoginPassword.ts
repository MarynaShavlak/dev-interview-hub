import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

/**
 * Selectors for accessing and managing the login form's password within the Redux store.
 *
 * `useLoginPassword` - A custom hook that uses the selector to retrieve the login form's password from the Redux store.
 * @returns - The current password from the login form, or an empty string if the password is not available.
 *
 * `getLoginPassword` - A selector function that retrieves the login form's password from the Redux store.
 * @param state - The Redux store's state.
 * @returns - The password from the login form, or an empty string if the password is not available.
 */

export const [useLoginPassword, getLoginPassword] = buildSelector(
    (state: StateSchema) => state?.loginForm?.password || '',
);
