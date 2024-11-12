import { PayloadAction } from '@reduxjs/toolkit';
import { initAuthData } from '../services/initAuthData/initAuthData';
import { saveJsonSettings } from '../services/saveJsonSettings/saveJsonSettings';
import { JsonSettings } from '../types/jsonSettings';
import { buildSlice } from '@/shared/lib/store';
import { UserSchema, User } from '../types/user';

const initialState: UserSchema = {
    _inited: false,
};

export const userSlice = buildSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, { payload }: PayloadAction<User>) => {
            state.authData = payload;
        },
        logout: (state) => {
            state.authData = undefined;
        },
        setUser: (state, { payload }: PayloadAction<User>) => {
            state.authData = payload;
        },
        clearUserData: (state) => {
            state.authData = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            saveJsonSettings.fulfilled,
            (state, { payload }: PayloadAction<JsonSettings>) => {
                if (state.authData) {
                    state.authData.jsonSettings = payload;
                }
            },
        );
        builder.addCase(
            initAuthData.fulfilled,
            (state, { payload }: PayloadAction<User>) => {
                state.authData = payload;
                state._inited = true;
            },
        );
        builder.addCase(initAuthData.rejected, (state) => {
            state._inited = true;
        });
    },
});

export const {
    actions: userActions,
    reducer: userReducer,
    useActions: useUserActions,
} = userSlice;
