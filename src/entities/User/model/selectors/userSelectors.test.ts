import { StateSchema } from '@/app/providers/StoreProvider';
import { getUserAuthData } from './getUserAuthData/getUserAuthData';
import { getUserInited } from './getUserInited/getUserInited';
import { getJsonSettings } from './jsonSettings/jsonSettings';
import { isUserAdmin, isUserManager } from './roles/roleSelectors';
import { UserRole } from '../consts/consts';

describe('user selectors ', () => {
    test('should return authData', () => {
        const authData = {
            username: 'username',
            id: 'user123',
        };
        const state: DeepPartial<StateSchema> = {
            user: {
                authData,
            },
        };
        expect(getUserAuthData(state as StateSchema)).toEqual(authData);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {
            user: {},
        };
        expect(getUserAuthData(state as StateSchema)).toEqual(undefined);
    });

    test('should return _inited value', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                _inited: true,
            },
        };
        expect(getUserInited(state as StateSchema)).toEqual(true);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = { user: {} };
        expect(getUserInited(state as StateSchema)).toEqual(undefined);
    });

    test('should return jsonSettings from authData', () => {
        const jsonSettings = {
            isFirstVisit: true,
            isArticlesPageWasOpened: false,
        };
        const state: DeepPartial<StateSchema> = {
            user: {
                authData: {
                    jsonSettings,
                },
            },
        };
        expect(getJsonSettings(state as StateSchema)).toEqual(jsonSettings);
    });

    test('should return default settings with empty authData', () => {
        const state: DeepPartial<StateSchema> = {
            user: {},
        };
        expect(getJsonSettings(state as StateSchema)).toEqual({});
    });

    test('should return default settings with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getJsonSettings(state as StateSchema)).toEqual({});
    });

    test('should return true for admin role', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                authData: {
                    roles: [UserRole.ADMIN],
                },
            },
        };
        expect(isUserAdmin(state as StateSchema)).toEqual(true);
        expect(isUserManager(state as StateSchema)).toEqual(false);
    });

    test('should return true for manager role', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                authData: {
                    roles: [UserRole.MANAGER],
                },
            },
        };
        expect(isUserAdmin(state as StateSchema)).toEqual(false);
        expect(isUserManager(state as StateSchema)).toEqual(true);
    });

    test('should return false for non-admin and non-manager roles', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                authData: {
                    roles: [UserRole.USER],
                },
            },
        };
        expect(isUserAdmin(state as StateSchema)).toEqual(false);
        expect(isUserManager(state as StateSchema)).toEqual(false);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = { user: {} };
        expect(isUserAdmin(state as StateSchema)).toEqual(false);
        expect(isUserManager(state as StateSchema)).toEqual(false);
    });
});
