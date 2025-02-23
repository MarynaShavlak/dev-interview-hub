import { FeatureFlags } from '@/shared/types/featureFlags/featureFlags';

interface UpdateFeatureFlagsOptions {
    userId: string;
    features: Partial<FeatureFlags>;
}

// const featureFlagsApi = rtkApi.injectEndpoints({
//     endpoints: (build) => ({
//         updateFeatureFlags: build.mutation<void, UpdateFeatureFlagsOptions>({
//             query: ({ userId, features }) => ({
//                 url: `/users/${userId}`,
//                 method: 'PATCH',
//                 body: {
//                     features,
//                 },
//             }),
//         }),
//     }),
// });

// export const featureFlagsApi = firestoreApi.injectEndpoints({
//     endpoints: (build) => ({
//         updateFeatureFlags: build.mutation<void, UpdateFeatureFlagsOptions>({
//             async queryFn({ userId, features }) {
//                 try {
//                     const userDocRef = await getUserDocRefById(userId);
//
//                     if (userDocRef) {
//                         await updateDoc(userDocRef, features);
//                     }
//                 } catch (error) {
//                     console.error('Error updating user data:', error);
//                 }
//             },
//         }),
//     }),
// });

// export const updateFeatureFlagsMutation =
//     featureFlagsApi.endpoints.updateFeatureFlags.initiate;
