import { createSelector } from '@reduxjs/toolkit';
import { buildSelector } from '@/shared/lib/store';
import { StateSchema } from '@/app/providers/StoreProvider';
import { UserRole } from '../../consts/consts';

/**
 * Selectors for accessing and managing user roles within the Redux store, and utilities for checking specific roles.
 *
 * `useUserRoles` - A custom hook that uses the selector to retrieve the user roles from the Redux store.
 * @returns - The current user roles from the store, or `undefined` if roles are not available.
 *
 * `getUserRoles` - A selector function that retrieves the user roles from the Redux store.
 * @param state - The Redux store's state.
 * @returns - The user roles from the store, or `undefined` if roles are not available.
 *
 * `isUserAdmin` - A selector function that checks if the user has the `ADMIN` role.
 * @param roles - The user roles obtained from `getUserRoles`.
 * @returns - `true` if the user has the `ADMIN` role, otherwise `false`.
 *
 * `isUserManager` - A selector function that checks if the user has the `MANAGER` role.
 * @param roles - The user roles obtained from `getUserRoles`.
 * @returns - `true` if the user has the `MANAGER` role, otherwise `false`.
 */

export const [useUserRoles, getUserRoles] = buildSelector(
    (state: StateSchema) => state.user.authData?.roles,
);

export const isUserAdmin = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes(UserRole.ADMIN)),
);
export const isUserManager = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes(UserRole.MANAGER)),
);
