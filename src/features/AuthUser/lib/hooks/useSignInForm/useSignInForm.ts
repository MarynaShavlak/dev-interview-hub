import { useCallback } from 'react';
import { useLoginError } from '../../../model/selectors/getLoginError/getLoginError';
import { useLoginIsLoading } from '../../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { useLoginPassword } from '../../../model/selectors/getLoginPassword/getLoginPassword';
import { useLoginEmail } from '../../../model/selectors/getLoginEmail/getLoginEmail';
import { useLoginActions } from '../../../model/slices/loginSlice/loginSlice';
import { useAuthentication } from '../useAuthentication/useAuthentication';

/**
 * Custom hook for managing the state and behavior of a login form.
 * It handles email and password input changes, login requests, and provides status and error information.
 *
 * @param {function} onSuccess - A callback function that is invoked when the login is successful. Can be used to trigger post-login actions, such as redirecting the user or updating the UI.
 *
 * @returns {{
 *    email: string;
 *    password: string;
 *    isLoading: boolean;
 *    error: string | null;
 *    onChangeEmail: (value: string) => void;
 *    onChangePassword: (value: string) => void;
 *    onLoginClick: () => void;
 * }} An object with the following properties:
 *  - `email`: A string representing the current value of the email input field.
 *  - `password`: A string representing the current value of the password input field.
 *  - `isLoading`: A boolean indicating whether the login request is in progress.
 *  - `error`: A string or null indicating an error message if the login request fails.
 *  - `onChangeEmail`: A function to handle changes in the email input field. Accepts the new email value as a parameter.
 *  - `onChangePassword`: A function to handle changes in the password input field. Accepts the new password value as a parameter.
 *  - `onLoginClick`: A function to handle the login button click event. Initiates the login process.
 */

export const useSignInForm = (
    onSuccess?: () => void,
): {
    email: string;
    password: string;
    isLoading: boolean;
    error: string | undefined;
    onChangeEmail: (value: string) => void;
    onChangePassword: (value: string) => void;
    onLoginClick: () => void;
    onResetPasswordClick: () => void;
} => {
    const email = useLoginEmail();
    const password = useLoginPassword();
    const isLoading = useLoginIsLoading();
    const error = useLoginError();
    const { setPassword, setEmail } = useLoginActions();
    const { signInCall, resetPasswordCall } = useAuthentication({ onSuccess });

    const onChangeEmail = useCallback(
        (value: string) => {
            setEmail(value);
        },
        [setEmail],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            setPassword(value);
        },
        [setPassword],
    );

    const onLoginClick = useCallback(async () => {
        await signInCall({ email, password });
    }, [password, signInCall, email]);

    const onResetPasswordClick = useCallback(async () => {
        await resetPasswordCall(email);
    }, [resetPasswordCall, email]);

    return {
        email,
        password,
        isLoading,
        error,
        onChangeEmail,
        onChangePassword,
        onLoginClick,
        onResetPasswordClick,
    };
};
