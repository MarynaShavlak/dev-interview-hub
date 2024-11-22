import { PayloadAction } from '@reduxjs/toolkit';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema } from '../types/editableProfileCardSchema';
import { buildSlice } from '@/shared/lib/store';
import { User } from '@/entities/User';

const initialState: ProfileSchema = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const profileSlice = buildSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
        },
        cancelEdit: (state) => {
            state.readonly = true;
            state.validateErrors = undefined;
            state.form = state.data;
        },
        updateProfile: (state, action: PayloadAction<Partial<User>>) => {
            const data = {
                ...state.form,
                ...action.payload,
            };
            state.form = data as User;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAuthData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                getAuthData.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                    state.form = action.payload;
                },
            )
            .addCase(getAuthData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateProfileData.pending, (state) => {
                state.validateErrors = undefined;
                state.isLoading = true;
            })
            .addCase(
                updateProfileData.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                    state.form = action.payload;
                    state.readonly = true;
                    state.validateErrors = undefined;
                },
            )
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.validateErrors = action.payload;
            });
    },
});

export const {
    actions: profileActions,
    reducer: profileReducer,
    useActions: useProfileActions,
} = profileSlice;
