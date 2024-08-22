import { ValidateProfileError } from '../consts/consts';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema } from '../types/editableProfileCardSchema';
import { profileActions, profileReducer } from './profileSlice';
import { testProfileData } from '@/entities/Profile/testing';

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
            data: testProfileData,
            form: { username: '' },
        };

        expect(
            profileReducer(state as ProfileSchema, profileActions.cancelEdit()),
        ).toEqual({
            readonly: true,
            validateErrors: undefined,
            data: testProfileData,
            form: testProfileData,
        });
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
            profileReducer(state as ProfileSchema, updateProfileData.pending),
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
                updateProfileData.fulfilled(testProfileData, ''),
            ),
        ).toEqual({
            isLoading: false,
            validateErrors: undefined,
            readonly: true,
            form: testProfileData,
            data: testProfileData,
        });
    });
});
