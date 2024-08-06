import { buildSelector } from '@/shared/lib/store';
import { JsonSettings } from '../../types/jsonSettings';

/**
 * Selectors for accessing and managing `jsonSettings` within the Redux store, specifically from the user's `authData`.
 *
 * defaultJsonSettings - Represents the default value for `JsonSettings`, initialized as an empty object.
 *
 * `useJsonSettings` - A custom hook that uses the selector to retrieve `jsonSettings` from the Redux store.
 * @returns - The current `jsonSettings` from the store, or `defaultJsonSettings` if `jsonSettings` is not available.
 *
 * `getJsonSettings` - A selector function that retrieves `jsonSettings` from the Redux store.
 * @param state - The Redux store's state.
 * @returns - The jsonSettings from the store, or defaultJsonSettings if jsonSettings is not available.
 * */

const defaultJsonSettings: JsonSettings = {};

export const [useJsonSettings, getJsonSettings] = buildSelector(
    (state) => state.user?.authData?.jsonSettings ?? defaultJsonSettings,
);
