import { useCallback } from 'react';
import { useAuthentication } from '../useAuthentication/useAuthentication';
import { useSignupActions } from '../../../model/slices/signupSlice/signupSlice';
import {
    useSignupEmail,
    useSignupError,
    useSignupFirstname,
    useSignupIsLoading,
    useSignupLastname,
    useSignupPassword,
    useSignupUsername,
} from '../../../model/selectors/getSignupData/getSignupData';

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

export const useSignupForm = (
    onSuccess: () => void,
): {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    isLoading: boolean;
    error: string | undefined;
    onChangeUsername: (value: string) => void;
    onChangeFirstname: (value: string) => void;
    onChangeLastname: (value: string) => void;
    onChangeEmail: (value: string) => void;
    onChangePassword: (value: string) => void;
    onSignupClick: () => void;
} => {
    const username = useSignupUsername();
    const lastname = useSignupLastname();
    const firstname = useSignupFirstname();
    const email = useSignupEmail();
    const password = useSignupPassword();
    const isLoading = useSignupIsLoading();
    const error = useSignupError();

    const { setPassword, setUsername, setFirstname, setLastname, setEmail } =
        useSignupActions();
    const { signUpCall } = useAuthentication({ onSuccess });

    const onChangeUsername = useCallback(
        (value: string) => {
            setUsername(value);
        },
        [setUsername],
    );
    const onChangeFirstname = useCallback(
        (value: string) => {
            setFirstname(value);
        },
        [setFirstname],
    );
    const onChangeLastname = useCallback(
        (value: string) => {
            setLastname(value);
        },
        [setLastname],
    );
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

    const onSignupClick = useCallback(async () => {
        await signUpCall({ email, password });
    }, [password, signUpCall, email]);

    return {
        username,
        firstname,
        lastname,
        email,
        password,
        isLoading,
        error,
        onChangeUsername,
        onChangePassword,
        onChangeEmail,
        onChangeLastname,
        onChangeFirstname,
        onSignupClick,
    };
};
