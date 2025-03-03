import { setFeatureFlags } from '@/shared/lib/features';
import {
    LOCAL_STORAGE_LAST_DESIGN_KEY,
    USER_LOCALSTORAGE_KEY,
} from '@/shared/const/localstorage';
import { User } from '../../model/types/user';

/**
 * Initializes user-specific features and stores the last design key in local storage.
 *
 * @param {User} user - The user object containing feature flags and other information.
 */
export const initializeUserFeatures = (user: User): void => {
    setFeatureFlags(user.features);
    // const designKey = user.features?.isAppRedesigned ? 'new' : 'new';

    const designKey = user.features?.isAppRedesigned ? 'new' : 'old';

    localStorage.setItem(LOCAL_STORAGE_LAST_DESIGN_KEY, designKey);
};

/**
 * Handles user authentication by initializing user features and storing user ID in local storage.
 *
 * @param {User} user - The user object containing feature flags and other information.
 */
export const handleUserAuthentication = (
    user: User,
    documentId: string,
): void => {
    initializeUserFeatures(user);
    localStorage.setItem(USER_LOCALSTORAGE_KEY, documentId);
};

/**
 * Clears user-related data from local storage upon logging out.
 * This function is typically called when a user session ends.
 */
export const clearUserDataFromStorage = (): void => {
    localStorage.removeItem(USER_LOCALSTORAGE_KEY);
};
