import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

/**
 * Selectors for accessing and managing the login form's error state within the Redux store.
 *
 * `useLoginError` - A custom hook that uses the selector to retrieve the login form's error state from the Redux store.
 * @returns - The current error state of the login form, or `undefined` if the error state is not available.
 *
 * `getLoginError` - A selector function that retrieves the login form's error state from the Redux store.
 * @param state - The Redux store's state.
 * @returns - The error state of the login form, or `undefined` if the error state is not available.
 */

export const [useLoginError, getLoginError] = buildSelector(
    (state: StateSchema) => state?.loginForm?.error,
);
