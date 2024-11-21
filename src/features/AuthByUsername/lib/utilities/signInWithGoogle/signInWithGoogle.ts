import {
    Auth,
    GoogleAuthProvider,
    signInWithPopup,
    User as FirebaseUser,
} from 'firebase/auth';

export const signInWithGoogle = async (auth: Auth): Promise<FirebaseUser> => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    if (!user) {
        throw new Error('No user data returned from Firebase');
    }
    return user;
};
