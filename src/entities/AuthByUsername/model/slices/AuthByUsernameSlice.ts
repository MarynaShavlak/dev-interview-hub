import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthByUsernameSchema } from '../types/AuthByUsernameSchema';

const initialState: AuthByUsernameSchema = {
    
};

export const AuthByUsernameSlice = createSlice({
    name: 'AuthByUsername',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {
           
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: AuthByUsernameActions } = AuthByUsernameSlice;
export const { reducer: AuthByUsernameReducer } = AuthByUsernameSlice;