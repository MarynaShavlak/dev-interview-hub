import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { JsonSettings } from '../../types/jsonSettings';
import { getUserAuthData } from '../../selectors/getUserAuthData/getUserAuthData';
import { getJsonSettings } from '../../selectors/getJsonSettings/getJsonSettings';
import { updateUserDataMutation } from '../../../api/userApi';

/**
 * Thunk to save and update user JSON settings.
 *
 * This thunk merges the provided new JSON settings with the current settings and
 * saves the updated settings to the server. It handles scenarios where user data
 * is not available and manages errors that may occur during the process.
 *
 * @param {JsonSettings} newJsonSettings - The new JSON settings to be merged with the existing ones.
 * @param {ThunkAPI} thunkAPI - The thunkAPI object provided by Redux Toolkit, containing dispatch, getState, extra, and more.
 * @returns {Promise<JsonSettings>} The updated JSON settings or an error message.
 */

export const saveJsonSettingsThunk = createAsyncThunk<
    JsonSettings,
    JsonSettings,
    ThunkConfig<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;

    const userData = getUserAuthData(getState());
    const currentSettings = getJsonSettings(getState());

    if (!userData) {
        return rejectWithValue('No user data found.');
    }

    try {
        // const response = await dispatch(
        //     setJsonSettingsMutation({
        //         userId: userData.id,
        //         jsonSettings: {
        //             ...currentSettings,
        //             ...newJsonSettings,
        //         },
        //     }),
        // ).unwrap();

        const updatedSettings = {
            ...currentSettings,
            ...newJsonSettings,
        };
        const response = await dispatch(
            updateUserDataMutation({
                userId: userData?.id,
                updates: {
                    jsonSettings: updatedSettings,
                },
            }),
        ).unwrap();
        console.log('updateProfileData', response);

        if (!response || !response.jsonSettings) {
            return rejectWithValue('Failed to retrieve updated JSON settings');
        }

        return response.jsonSettings;
    } catch (error) {
        console.error('Error saving JSON settings:', error);
        return rejectWithValue('An error occurred while saving JSON settings.');
    }
});
