import { loginActions, loginReducer } from './loginSlice';
import { LoginSchema } from '../../types/loginSchema';
import { loginByUsername } from '../../services/loginByUsername/loginByUsername';
import { testUserData } from '@/entities/User/testing';

describe('loginSlice tests', () => {
    const initialState: LoginSchema = {
        isLoading: false,
        email: '',
        password: '',
        error: undefined,
    };

    test('should return the initial state', () => {
        expect(loginReducer(undefined, { type: '' })).toEqual(initialState);
    });

    test('should handle setUsername action', () => {
        const state: DeepPartial<LoginSchema> = { email: 'oldEmail@gmail.com' };
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setEmail('newEmail@gmail.com'),
            ),
        ).toEqual({ email: 'newEmail@gmail.com' });
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
                    email: '',
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
                    { email: '', password: '' },
                    'Login failed',
                ),
            ),
        ).toEqual({
            isLoading: false,
            error: 'Login failed',
        });
    });

    test('should handle multiple actions in sequence', () => {
        let state: LoginSchema = initialState;

        state = loginReducer(state, loginActions.setEmail('user1'));
        state = loginReducer(state, loginActions.setPassword('pass1'));
        state = loginReducer(state, loginByUsername.pending);

        expect(state).toEqual({
            email: 'user1',
            password: 'pass1',
            isLoading: true,
            error: undefined,
        });

        state = loginReducer(
            state,
            loginByUsername.fulfilled(testUserData, '', {
                email: 'user1',
                password: 'pass1',
            }),
        );

        expect(state).toEqual({
            email: 'user1',
            password: 'pass1',
            isLoading: false,
            error: undefined,
        });
    });
});
