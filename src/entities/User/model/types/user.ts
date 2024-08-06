import { JsonSettings } from './jsonSettings';
import { FeatureFlags } from '@/shared/types/featureFlags/featureFlags';
import { UserRole } from '../consts/consts';

/**
 * Interface representing a user.
 *
 * @property {string} id - Unique identifier for the user.
 * @property {string} username - The user's username.
 * @property {string} [avatar] - URL of the user's avatar image. Optional.
 * @property {UserRole[]} [roles] - Array of roles assigned to the user. Optional.
 * @property {FeatureFlags} [features] - Feature flags associated with the user. Optional.
 * @property {JsonSettings} [jsonSettings] - JSON settings for the user. Optional.
 */
export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
    features?: FeatureFlags;
    jsonSettings?: JsonSettings;
}

/**
 * Interface representing the schema of a user.
 *
 * @property {User} [authData] - The authenticated user's data. Optional.
 * @property {boolean} _inited - Indicates whether the user  has been initialized.
 */
export interface UserSchema {
    authData?: User;
    _inited: boolean;
}
