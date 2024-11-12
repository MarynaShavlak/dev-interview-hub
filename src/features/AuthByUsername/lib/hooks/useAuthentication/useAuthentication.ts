import { useContext, useState } from 'react';
import {
    signInWithEmailAndPassword,
    signOut,
    UserCredential,
    User as FirebaseUser,
} from 'firebase/auth';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Context } from '../../../../../../json-server/firebase';
import { User, userActions } from '@/entities/User';
import { signupByEmail } from '../../../model/services/loginByUsername/loginByUsername';

interface AuthCredentials {
    email: string;
    password: string;
}

const mapFirebaseUserToCustomUser = (firebaseUser: FirebaseUser): User => {
    return {
        id: firebaseUser.uid,
        username: firebaseUser.email || 'Unknown',
        avatar: firebaseUser.photoURL || undefined,
    };
};

export const useAuthentication = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const { auth } = useContext(Context);
    const { setUser, clearUserData } = userActions;

    const signInCall = async ({ email, password }: AuthCredentials) => {
        setIsLoading(true);
        try {
            const userCredential: UserCredential =
                await signInWithEmailAndPassword(auth, email, password);
            const customUser: User = mapFirebaseUserToCustomUser(
                userCredential.user,
            );
            return customUser;
            // await dispatch(setUser(customUser));
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const signUpCall = async ({ email, password }: AuthCredentials) => {
        setIsLoading(true);
        dispatch(signupByEmail())
            .unwrap()
            .then((data) => {
                onSucees?.();
                forceUpdate?.();
                setIsLoading(false);
            });
    };

    const signOutCall = async () => {
        setIsLoading(true);
        try {
            await signOut(auth);
            dispatch(clearUserData());
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, signInCall, signUpCall, signOutCall };
};
