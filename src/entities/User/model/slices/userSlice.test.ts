import { userActions, userReducer } from './userSlice';
import { User, UserSchema } from '../types/user';
import { testUserData } from '../../testing';
import { JsonSettings } from '../types/jsonSettings';
import { initAuthData } from '../../model/services/initAuthData/initAuthData';
import { saveJsonSettings } from '../../model/services/saveJsonSettings/saveJsonSettings';
import { Theme } from '@/shared/const/theme';

describe('userSlice tests', () => {
    const initialState: UserSchema = {
        _inited: false,
        isLoading: false,
        error: undefined,
    };

    test('should return the initial state', () => {
        expect(userReducer(undefined, { type: '' })).toEqual(initialState);
    });

    test('should handle setAuthData action', () => {
        const authData: User = { ...testUserData, jsonSettings: {} };
        const state: DeepPartial<UserSchema> = {};
        const newState = userReducer(
            state as UserSchema,
            userActions.setAuthData(authData),
        );
        expect(newState).toEqual({
            authData,
        });
    });

    test('should handle logout action', () => {
        const state: DeepPartial<UserSchema> = {
            authData: { ...testUserData, jsonSettings: {} },
        };
        const newState = userReducer(state as UserSchema, userActions.logout());
        expect(newState).toEqual({
            authData: undefined,
        });
    });

    test('should handle saveJsonSettings.fulfilled', () => {
        const jsonSettings: JsonSettings = { theme: Theme.DARK };
        const authData: User = { ...testUserData, jsonSettings: {} };
        const state: DeepPartial<UserSchema> = { authData };
        const newState = userReducer(
            state as UserSchema,
            saveJsonSettings.fulfilled(jsonSettings, '', jsonSettings),
        );
        expect(newState).toEqual({
            authData: {
                ...authData,
                jsonSettings,
            },
        });
    });

    test('should handle initAuthData.fulfilled', () => {
        const authData: User = { ...testUserData, jsonSettings: {} };
        const state: DeepPartial<UserSchema> = { _inited: false };
        const newState = userReducer(
            state as UserSchema,
            initAuthData.fulfilled(authData, ''),
        );
        expect(newState).toEqual({
            authData,
            _inited: true,
        });
    });

    test('should handle initAuthData.rejected', () => {
        const state: DeepPartial<UserSchema> = { _inited: false };
        const newState = userReducer(
            state as UserSchema,
            initAuthData.rejected(
                new Error(
                    'Failed to initialize auth data.Failed to initialize auth data.',
                ),
                '',
            ),
        );
        expect(newState).toEqual({
            _inited: true,
        });
    });
    test('should handle concurrent actions correctly', () => {
        const initialAuthData: User = { ...testUserData, jsonSettings: {} };
        const initialState: UserSchema = {
            authData: initialAuthData,
            _inited: false,
            isLoading: false,
            error: undefined,
        };

        const jsonSettings1: JsonSettings = { theme: Theme.DARK };
        const jsonSettings2: JsonSettings = { theme: Theme.LIGHT };

        let state = userReducer(
            initialState,
            saveJsonSettings.fulfilled(jsonSettings1, '', jsonSettings1),
        );
        state = userReducer(
            state,
            saveJsonSettings.fulfilled(jsonSettings2, '', jsonSettings2),
        );

        expect(state.authData?.jsonSettings).toEqual(jsonSettings2);
    });
});
