import { loginActions, loginReducer } from './loginSlice';
import { LoginSchema } from '../types/loginSchema';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';
import { testUserData } from '@/entities/User/testing';

describe('loginSlice tests', () => {
    const initialState: LoginSchema = {
        isLoading: false,
        username: '',
        password: '',
        error: undefined,
    };

    test('should return the initial state', () => {
        expect(loginReducer(undefined, { type: '' })).toEqual(initialState);
    });

    test('should handle setUsername action', () => {
        const state: DeepPartial<LoginSchema> = { username: 'oldUsername' };
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setUsername('newUsername'),
            ),
        ).toEqual({ username: 'newUsername' });
    });

    test('should handle setPassword action', () => {
        const state: DeepPartial<LoginSchema> = { password: 'oldPassword' };
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setPassword('newPassword'),
            ),
        ).toEqual({ password: 'newPassword' });
    });
    test('should handle loginByUsername.pending', () => {
        const state: DeepPartial<LoginSchema> = {
            isLoading: false,
            error: 'Some error',
        };

        expect(
            loginReducer(state as LoginSchema, loginByUsername.pending),
        ).toEqual({
            isLoading: true,
            error: undefined,
        });
    });

    test('should handle loginByUsername.fulfilled', () => {
        const state: DeepPartial<LoginSchema> = { isLoading: true };

        expect(
            loginReducer(
                state as LoginSchema,
                loginByUsername.fulfilled(testUserData, '', {
                    username: '',
                    password: '',
                }),
            ),
        ).toEqual({
            isLoading: false,
        });
    });

    test('should handle loginByUsername.rejected', () => {
        const state: DeepPartial<LoginSchema> = { isLoading: true };
        expect(
            loginReducer(
                state as LoginSchema,
                loginByUsername.rejected(
                    new Error('Login failed'),
                    '',
                    { username: '', password: '' },
                    'Login failed',
                ),
            ),
        ).toEqual({
            isLoading: false,
            error: 'Login failed',
        });
    });
});
