import { useState } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { loginByEmailThunk } from '../../../model/services/loginByEmailThunk/loginByEmailThunk';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { logoutUser } from '@/entities/User';
import {
    signupByEmailThunk,
    SignupCredentials,
} from '../../../model/services/signupByEmailThunk/signupByEmailThunk';
import { authByGoogleThunk } from '../../../model/services/authByGoogleThunk/authByGoogleThunk';
import { resetPassword } from '../../../model/services/resetPassword/resetPassword';

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
    resetPasswordCall: (email: string) => void;
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
            await dispatch(loginByEmailThunk({ email, password })).unwrap();
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
            await dispatch(signupByEmailThunk(signUpData)).unwrap();
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
            await dispatch(authByGoogleThunk()).unwrap();
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

    const resetPasswordCall = async (email: string) => {
        setIsFetchingUser(true);
        try {
            await dispatch(resetPassword(email));
            onSuccess?.();
            console.log('Password reset email sent successfully.');
        } catch (error) {
            console.error('Error sending password reset email:', error);
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
        resetPasswordCall,
    };
};
