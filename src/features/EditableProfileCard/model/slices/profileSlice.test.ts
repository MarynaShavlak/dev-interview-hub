import { ValidateProfileError } from '../consts/consts';
import { updateUserProfileThunk } from '../services/updateUserProfileThunk/updateUserProfileThunk';
import { ProfileSchema } from '../types/editableProfileCardSchema';
import { profileActions, profileReducer } from './profileSlice';

import { User } from '@/entities/User';
import { testUserData } from '@/entities/User/testing';

describe('profileSlice tests', () => {
    const initialState: ProfileSchema = {
        data: undefined,
        isLoading: false,
        error: undefined,
        readonly: true,
    };
    test('should return the initial state', () => {
        expect(profileReducer(undefined, { type: '' })).toEqual(initialState);
    });

    test('should handle setReadonly action', () => {
        const state: DeepPartial<ProfileSchema> = { readonly: false };
        expect(
            profileReducer(
                state as ProfileSchema,
                profileActions.setReadonly(true),
            ),
        ).toEqual({ readonly: true });
    });

    test('should handle cancelEdit action', () => {
        const state: DeepPartial<ProfileSchema> = {
            data: testUserData,
            form: { username: '' },
        };

        expect(
            profileReducer(state as ProfileSchema, profileActions.cancelEdit()),
        ).toEqual({
            readonly: true,
            validateErrors: undefined,
            data: testUserData,
            form: testUserData,
        });
    });

    test('should correctly toggle readonly state', () => {
        const stateAfterSetReadonly = profileReducer(
            initialState,
            profileActions.setReadonly(false),
        );

        expect(stateAfterSetReadonly.readonly).toBe(false);

        const stateAfterSetReadonlyBack = profileReducer(
            stateAfterSetReadonly,
            profileActions.setReadonly(true),
        );

        expect(stateAfterSetReadonlyBack.readonly).toBe(true);
    });

    test('should handle updateProfile action', () => {
        const state: DeepPartial<ProfileSchema> = { form: { username: '123' } };

        expect(
            profileReducer(
                state as ProfileSchema,
                profileActions.updateProfile({
                    username: '123456',
                }),
            ),
        ).toEqual({
            form: { username: '123456' },
        });
    });

    test('should handle updateProfileData.pending', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: [ValidateProfileError.SERVER_ERROR],
        };

        expect(
            profileReducer(
                state as ProfileSchema,
                updateUserProfileThunk.pending,
            ),
        ).toEqual({
            isLoading: true,
            validateErrors: undefined,
        });
    });

    test('should handle updateProfileData.fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
        };

        expect(
            profileReducer(
                state as ProfileSchema,
                updateUserProfileThunk.fulfilled(testUserData, ''),
            ),
        ).toEqual({
            isLoading: false,
            validateErrors: undefined,
            readonly: true,
            form: testUserData,
            data: testUserData,
        });
    });

    test('should handle empty profile data in updateProfileData.fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
        };

        const emptyProfileData: User = {} as User;

        const newState = profileReducer(
            state as ProfileSchema,
            updateUserProfileThunk.fulfilled(emptyProfileData, ''),
        );

        expect(newState.isLoading).toBe(false);
        expect(newState.data).toEqual(emptyProfileData);
        expect(newState.form).toEqual(emptyProfileData);
        expect(newState.readonly).toBe(true);
    });
});
