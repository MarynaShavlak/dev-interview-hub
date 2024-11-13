import { useCallback } from 'react';
import { useLoginError } from '../../../model/selectors/getLoginError/getLoginError';
import { useLoginIsLoading } from '../../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { useLoginPassword } from '../../../model/selectors/getLoginPassword/getLoginPassword';
import { useLoginUsername } from '../../../model/selectors/getLoginUsername/getLoginUsername';
import { useLoginActions } from '../../../model/slices/loginSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAuthentication } from '../useAuthentication/useAuthentication';

/**
 * Custom hook for managing the state and behavior of a login form.
 * It handles username and password input changes, login requests, and provides status and error information.
 *
 * @param {function} onSuccess - A callback function that is invoked when the login is successful. Can be used to trigger post-login actions, such as redirecting the user or updating the UI.
 *
 * @returns {{
 *    username: string;
 *    password: string;
 *    isLoading: boolean;
 *    error: string | null;
 *    onChangeUsername: (value: string) => void;
 *    onChangePassword: (value: string) => void;
 *    onLoginClick: () => void;
 * }} An object with the following properties:
 *  - `username`: A string representing the current value of the username input field.
 *  - `password`: A string representing the current value of the password input field.
 *  - `isLoading`: A boolean indicating whether the login request is in progress.
 *  - `error`: A string or null indicating an error message if the login request fails.
 *  - `onChangeUsername`: A function to handle changes in the username input field. Accepts the new username value as a parameter.
 *  - `onChangePassword`: A function to handle changes in the password input field. Accepts the new password value as a parameter.
 *  - `onLoginClick`: A function to handle the login button click event. Initiates the login process.
 */

export const useLoginForm = (onSuccess: () => void) => {
    const dispatch = useAppDispatch();
    const username = useLoginUsername();
    const password = useLoginPassword();
    const isLoading = useLoginIsLoading();
    const error = useLoginError();
    // const forceUpdate = useForceUpdate();
    const { setPassword, setUsername } = useLoginActions();
    const { signUpCall, signInCall } = useAuthentication({ onSuccess });

    const onChangeUsername = useCallback(
        (value: string) => {
            setUsername(value);
        },
        [setUsername],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            setPassword(value);
        },
        [setPassword],
    );

    const onLoginClick = useCallback(async () => {
        await signInCall({ email: username, password });
        // const result = await dispatch(loginByUsername({ username, password }));
        // if (result.meta.requestStatus === 'fulfilled') {
        //     onSuccess();
        //     forceUpdate();
        // }
    }, [password, signInCall, username]);

    const onSignupClick = useCallback(async () => {
        await signUpCall({ email: username, password });
        // const result = await dispatch(
        //     signupByEmail({ username, password, signUpCall }),
        // );
        // if (result.meta.requestStatus === 'fulfilled') {
        //     onSuccess();
        //     forceUpdate();
        // }
    }, [password, signUpCall, username]);

    return {
        username,
        password,
        isLoading,
        error,
        onChangeUsername,
        onChangePassword,
        onLoginClick,
        onSignupClick,
    };
};
