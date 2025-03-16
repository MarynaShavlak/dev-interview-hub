import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { LoginSchema } from '../../types/loginSchema';
import { loginByEmailThunk } from '../../services/loginByEmailThunk/loginByEmailThunk';

const initialState: LoginSchema = {
    isLoading: false,
    email: '',
    password: '',
    error: undefined,
};

export const loginSlice = buildSlice({
    name: 'login',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
            state.error = undefined;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
            state.error = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByEmailThunk.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByEmailThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
            })
            .addCase(loginByEmailThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    actions: loginActions,
    reducer: loginReducer,
    useActions: useLoginActions,
} = loginSlice;
