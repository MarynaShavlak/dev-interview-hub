import { useState } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { loginByUsername } from '../../../model/services/loginByUsername/loginByUsername';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { logoutUser } from '@/entities/User';
import {
    signupByEmail,
    SignupCredentials,
} from '../../../model/services/signupByEmail/signupByEmail';
import { authByGoogleProvider } from '../../../model/services/authByGoogleProvider/authByGoogleProvider';

interface AuthCredentials {
    email: string;
    password: string;
}

interface UseAuthenticationProps {
    onSuccess?: () => void;
}

interface UseAuthenticationReturn {
    isFetchingUser: boolean;
    signInCall: (credentials: AuthCredentials) => Promise<void>;
    signUpCall: (credentials: SignupCredentials) => Promise<void>;
    signOutCall: () => Promise<void>;
    authByGoogleCall: () => Promise<void>;
}

export const useAuthentication = ({
    onSuccess,
}: UseAuthenticationProps): UseAuthenticationReturn => {
    const dispatch = useAppDispatch();
    const forceUpdate = useForceUpdate();
    const [isFetchingUser, setIsFetchingUser] = useState(false);

    const signInCall = async ({ email, password }: AuthCredentials) => {
        setIsFetchingUser(true);

        try {
            await dispatch(loginByUsername({ email, password })).unwrap();
            onSuccess?.();
            forceUpdate();
        } catch (error) {
            console.error('Error during sign in:', error);
        } finally {
            setIsFetchingUser(false);
        }
    };

    const signUpCall = async (signUpData: SignupCredentials) => {
        setIsFetchingUser(true);
        try {
            await dispatch(signupByEmail(signUpData)).unwrap();
            onSuccess?.();
            forceUpdate();
        } catch (error) {
            console.error('Error during sign up:', error);
        } finally {
            setIsFetchingUser(false);
        }
    };

    const authByGoogleCall = async () => {
        setIsFetchingUser(true);
        try {
            await dispatch(authByGoogleProvider()).unwrap();
            onSuccess?.();
            forceUpdate();
        } catch (error) {
            console.error('Error during google authentication:', error);
        } finally {
            setIsFetchingUser(false);
        }
    };

    const signOutCall = async () => {
        setIsFetchingUser(true);

        try {
            await dispatch(logoutUser()).unwrap();
        } catch (error) {
            console.error('Error during sign out:', error);
        } finally {
            setIsFetchingUser(false);
        }
    };

    return {
        isFetchingUser,
        signUpCall,
        signInCall,
        signOutCall,
        authByGoogleCall,
    };
};
