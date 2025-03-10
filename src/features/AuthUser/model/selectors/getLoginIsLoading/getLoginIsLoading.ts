import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

/**
 * Selectors for accessing and managing the loading state of the login form within the Redux store.
 *
 * `useLoginIsLoading` - A custom hook that uses the selector to retrieve the login form's loading state from the Redux store.
 * @returns - The current loading state of the login form, or `false` if the loading state is not available.
 *
 * `getLoginIsLoading` - A selector function that retrieves the login form's loading state from the Redux store.
 * @param state - The Redux store's state.
 * @returns - The loading state of the login form, or `false` if the loading state is not available.
 */

export const [useLoginIsLoading, getLoginIsLoading] = buildSelector(
    (state: StateSchema) => state?.loginForm?.isLoading || false,
);
