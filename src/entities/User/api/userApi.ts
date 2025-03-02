import { getDoc, onSnapshot, query, updateDoc } from 'firebase/firestore';

import { firestoreApi } from '@/shared/api/firestoreApi';
import { User } from '../model/types/user';
import { getUserDocRefById } from '../lib/utilities/getUserDocRefById/getUserDocRefById';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { executeQuery } from '@/shared/lib/firestore/executeQuery/executeQuery';

import { fetchUser } from '../lib/utilities/fetchUser/fetchUser';
import { ERROR_USER_MESSAGES } from '../model/consts/errorUserMessages';
import { subscribeToUser } from '../lib/utilities/subscribeToUser/subscribeToUser';
import { handleFirestoreSubscription } from '@/shared/lib/firestore/handleFirestoreSubscription/handleFirestoreSubscription';

import { deleteDocFromFirestore } from '@/shared/lib/firestore/deleteDocFromFirestore/deleteDocFromFirestore';

export const userFirebaseApi = firestoreApi
    .enhanceEndpoints({
        addTagTypes: ['Users'],
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getUsers: build.query<User[], void>({
                providesTags: ['Users'],
                keepUnusedDataFor: 3600,
                async queryFn() {
                    return { data: [] };
                },
                async onCacheEntryAdded(
                    _,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    await cacheDataLoaded;
                    let unsubscribe;
                    try {
                        const collectionRef = dataPoint<User>('users');
                        const queryRef = query(collectionRef);
                        unsubscribe = onSnapshot(queryRef, (snapshot) => {
                            updateCachedData((draft) => {
                                return snapshot?.docs?.map((doc) =>
                                    doc.data(),
                                ) as User[];
                            });
                        });
                    } catch (error) {
                        console.log('error in users!', error);
                        throw new Error('Something went wrong with users.');
                    }
                    await cacheEntryRemoved;
                    if (unsubscribe) {
                        unsubscribe();
                    }
                },
            }),
            getUserDataById: build.query<User, string>({
                providesTags: (result, error, userId) => [
                    { type: 'Users', id: userId },
                ],
                async queryFn(userId) {
                    return executeQuery(
                        () => fetchUser(userId),
                        ERROR_USER_MESSAGES.FETCH_USER_ERROR(userId),
                    );
                },
                async onCacheEntryAdded(
                    userId,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    handleFirestoreSubscription({
                        subscriptionFn: subscribeToUser,
                        updateFn: updateCachedData,
                        dependency: userId,
                        cacheDataLoaded,
                        cacheEntryRemoved,
                    });
                },
            }),
            deleteUser: build.mutation<string, string>({
                invalidatesTags: ['Users'],
                async queryFn(userId) {
                    return executeQuery(
                        async () => deleteDocFromFirestore('users', userId),
                        ERROR_USER_MESSAGES.DELETE_USER_ID_FAIL(userId),
                    );
                },
            }),
            updateUserData: build.mutation<
                User,
                { userId: string; updates: Partial<User> }
            >({
                async queryFn({ userId, updates }) {
                    try {
                        const userDocRef = await getUserDocRefById(userId);

                        if (userDocRef) {
                            await updateDoc(userDocRef, updates);
                            const updatedDoc = await getDoc(userDocRef);
                            const updatedData = updatedDoc.data();

                            if (updatedData) {
                                return {
                                    data: {
                                        ...updatedData,
                                    } as User,
                                };
                            }
                        }
                        return {
                            error: {
                                name: 'NotFound',
                                message: 'User not found',
                            },
                        };
                    } catch (error) {
                        console.error('Error updating user data:', error);
                        return { error };
                    }
                },
            }),
        }),
    });

export const getUserDataByIdQuery =
    userFirebaseApi.endpoints.getUserDataById.initiate;
export const updateUserDataMutation =
    userFirebaseApi.endpoints.updateUserData.initiate;
export const { useGetUsersQuery: useUsers } = userFirebaseApi;

export const deleteUserMutation = userFirebaseApi.endpoints.deleteUser.initiate;

// await cacheDataLoaded;
// let unsubscribe;
// try {
//     const userDocRef = await getDocRefByField<User>(
//         'users',
//         'id',
//         userId,
//     );
//
//     unsubscribe = userDocRef
//         ? onSnapshot(userDocRef, (doc) => {
//             if (doc.exists()) {
//                 updateCachedData(
//                     () => doc.data() as User,
//                 );
//             } else {
//                 console.log('User not found in snapshot');
//             }
//         })
//         : null;
// } catch (error) {
//     console.error('Error in user data snapshot:', error);
// }
//
// await cacheEntryRemoved;
// if (unsubscribe) {
//     unsubscribe();
// }
