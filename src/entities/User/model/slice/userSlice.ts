import { PayloadAction } from '@reduxjs/toolkit';
import { initAuthData } from '../services/initAuthData';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { JsonSettings } from '../types/jsonSettings';
import { setFeatureFlags } from '@/shared/lib/features';
import { buildSlice } from '@/shared/lib/store';
import {
    LOCAL_STORAGE_LAST_DESIGN_KEY,
    USER_LOCALSTORAGE_KEY,
} from '@/shared/const/localstorage';
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
            setFeatureFlags(payload.features);
            localStorage.setItem(USER_LOCALSTORAGE_KEY, payload.id);
            localStorage.setItem(
                LOCAL_STORAGE_LAST_DESIGN_KEY,
                payload.features?.isAppRedesigned ? 'new' : 'old',
            );
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
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
                setFeatureFlags(payload.features);
                state._inited = true;
            },
        );
        builder.addCase(initAuthData.rejected, (state) => {
            state._inited = true;
        });
    },
});

// Action creators are generated for each case reducer function
export const {
    actions: userActions,
    reducer: userReducer,
    useActions: useUserActions,
} = userSlice;
