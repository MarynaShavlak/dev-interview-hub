import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { SignupSchema } from '../../../model/types/signupSchema';
import { signupByEmail } from '../../services/signupByEmail/signupByEmail';

const initialState: SignupSchema = {
    isLoading: false,
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    error: undefined,
};

export const signupSlice = buildSlice({
    name: 'signup',
    initialState,
    reducers: {
        setFirstname: (state, action: PayloadAction<string>) => {
            state.firstname = action.payload;
        },
        setLastname: (state, action: PayloadAction<string>) => {
            state.lastname = action.payload;
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupByEmail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(signupByEmail.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(signupByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    actions: signupActions,
    reducer: signupReducer,
    useActions: useSignupActions,
} = signupSlice;
