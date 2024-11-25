import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { LoginSchema } from '../../types/loginSchema';
import { loginByEmailThunk } from '../../services/loginByEmailThunk/loginByEmailThunk';

const initialState: LoginSchema = {
    isLoading: false,
    email: '',
    password: '',
};

export const loginSlice = buildSlice({
    name: 'login',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
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
