import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

/**
 * Selectors for accessing and managing the login form's email within the Redux store.
 *
 * `useLoginEmail` - A custom hook that uses the selector to retrieve the login form's email from the Redux store.
 * @returns - The current email from the login form, or an empty string if the email is not available.
 *
 * `getLoginEmail` - A selector function that retrieves the login form's email from the Redux store.
 * @param state - The Redux store's state.
 * @returns - The email from the login form, or an empty string if the email is not available.
 */
export const [useLoginEmail, getLoginEmail] = buildSelector(
    (state: StateSchema) => state?.loginForm?.email || '',
);
