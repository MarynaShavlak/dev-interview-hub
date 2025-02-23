export {};

// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { ThunkConfig } from '@/app/providers/StoreProvider';
// import { FeatureFlags } from '@/shared/types/featureFlags/featureFlags';
// import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';
// import {
//     getAllFeatureFlags,
//     setFeatureFlags,
// } from '../lib/setGetFeatures/setGetFeatures';
//
// interface UpdateFeatureFlagOptions {
//     userId: string;
//     newFeatures: Partial<FeatureFlags>;
// }
//
// /**
//  * Updates feature flags for a specific user.
//  *
//  * @param options - The options for updating feature flags, including userId and newFeatures.
//  * @returns A thunk action that resolves to void.
//  */
//
// export const updateFeatureFlag = createAsyncThunk<
//     void,
//     UpdateFeatureFlagOptions,
//     ThunkConfig<string>
// >('features/updateFeatureFlag', async ({ userId, newFeatures }, thunkApi) => {
//     const { rejectWithValue, dispatch } = thunkApi;
//     const allFeatures = {
//         ...getAllFeatureFlags(),
//         ...newFeatures,
//     };
//     console.log('allFeatures', allFeatures);
//
//     try {
//         await dispatch(
//             updateFeatureFlagsMutation({
//                 userId,
//                 features: allFeatures,
//             }),
//         );
//         setFeatureFlags(allFeatures);
//
//         // window.location.reload();
//         return undefined;
//     } catch (error) {
//         console.error('Failed to update feature flags:', error);
//         return rejectWithValue(
//             'An error occurred while updating feature flags.',
//         );
//     }
// });
