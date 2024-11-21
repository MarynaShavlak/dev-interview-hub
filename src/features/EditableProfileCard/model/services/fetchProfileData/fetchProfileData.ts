/**
 * Fetches the profile data for a given profile ID.
 *
 * @param profileId - The ID of the profile to fetch.
 * @param {ThunkAPI} thunkAPI - The thunkAPI object provided by Redux Toolkit, containing dispatch, getState, extra, and more.
 * @returns A thunk action that resolves to the profile data.
 */

// export const fetchProfileData = createAsyncThunk<
//     Profile,
//     string,
//     ThunkConfig<string>
// >('profile/fetchProfileData', async (profileId, thunkApi) => {
//     const { extra, rejectWithValue } = thunkApi;
//
//     try {
//         const response = await extra.api.get<Profile>(`/profile/${profileId}`);
//
//         if (!response.data) {
//             throw new Error('No data returned from API');
//         }
//
//         return response.data;
//     } catch (error) {
//         console.error('Failed to fetch profile data:', error);
//         return rejectWithValue('Failed to fetch profile data');
//     }
// });
export {};
