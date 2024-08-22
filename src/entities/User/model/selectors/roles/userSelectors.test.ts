import { StateSchema } from '@/app/providers/StoreProvider';
import { isUserAdmin, isUserManager } from './roleSelectors';
import { UserRole } from '../../consts/consts';

describe('user roles selectors ', () => {
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
