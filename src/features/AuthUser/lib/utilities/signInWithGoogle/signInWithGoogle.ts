import {
    Auth,
    GoogleAuthProvider,
    signInWithPopup,
    User as FirebaseUser,
} from 'firebase/auth';
import { assertExists } from '@/shared/lib/checks/assertExists/assertExists';

export const signInWithGoogle = async (auth: Auth): Promise<FirebaseUser> => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    assertExists(user, 'No user data returned from Firebase');
    return user;
};
