import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

/**
 * Selectors for accessing and managing the login form's username within the Redux store.
 *
 * `useLoginUsername` - A custom hook that uses the selector to retrieve the login form's username from the Redux store.
 * @returns - The current username from the login form, or an empty string if the username is not available.
 *
 * `getLoginUsername` - A selector function that retrieves the login form's username from the Redux store.
 * @param state - The Redux store's state.
 * @returns - The username from the login form, or an empty string if the username is not available.
 */
export const [useLoginUsername, getLoginUsername] = buildSelector(
    (state: StateSchema) => state?.loginForm?.username || '',
);
