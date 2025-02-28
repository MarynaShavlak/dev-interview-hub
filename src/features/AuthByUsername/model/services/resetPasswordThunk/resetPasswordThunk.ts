import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendPasswordResetEmail } from 'firebase/auth';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const resetPasswordThunk = createAsyncThunk<
    void,
    string,
    ThunkConfig<string>
>('auth/resetPassword', async (email, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;
    // const { setUser } = userActions;
    const { auth } = extra;
    try {
        await sendPasswordResetEmail(auth, email);
        return undefined;
    } catch (error: any) {
        console.error('Error sending password reset email:', error);
        return rejectWithValue(
            'Failed to send password reset email. Please try again.',
        );
    }
});
