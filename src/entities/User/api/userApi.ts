import { getDoc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { firestoreApi } from '@/shared/api/rtkApi';
import { User } from '../model/types/user';
import { getUserDocRefById } from '../lib/utilities/getUserDocRefById/getUserDocRefById';
import { fetchDocumentByRef } from '@/shared/lib/firestore/fetchDocumentByRef/fetchDocumentByRef';
import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';
import { dataPoint } from '@/shared/lib/firestore/firestore';
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
                    try {
                        const userDocRef = await getDocRefByField<User>(
                            'users',
                            'id',
                            userId,
                        );
                        const userData =
                            await fetchDocumentByRef<User>(userDocRef);
                        return { data: userData };
                    } catch (error) {
                        console.error('Error fetching user data:', error);
                        return { error: { message: 'User not found' } };
                    }
                },
                async onCacheEntryAdded(
                    userId,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    await cacheDataLoaded;
                    let unsubscribe;
                    try {
                        const userDocRef = await getDocRefByField<User>(
                            'users',
                            'id',
                            userId,
                        );

                        unsubscribe = userDocRef
                            ? onSnapshot(userDocRef, (doc) => {
                                  if (doc.exists()) {
                                      updateCachedData(
                                          () => doc.data() as User,
                                      );
                                  } else {
                                      console.log('User not found in snapshot');
                                  }
                              })
                            : null;
                    } catch (error) {
                        console.error('Error in user data snapshot:', error);
                    }

                    await cacheEntryRemoved;
                    if (unsubscribe) {
                        unsubscribe();
                    }
                },
            }),
            deleteUser: build.mutation<string, string>({
                invalidatesTags: ['Users'],
                async queryFn(userId) {
                    try {
                        await deleteDocFromFirestore('users', userId);
                        return { data: userId };
                    } catch (error) {
                        return { error };
                    }
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

// interface SetJsonSettingsArg {
//     userId: string;
//     jsonSettings: JsonSettings;
// }

// export const userApi = rtkApi.injectEndpoints({
//     endpoints: (build) => ({
//         getUserDataById: build.query<User, string>({
//             query: (userId) => ({
//                 url: `/users/${userId}`,
//                 method: 'GET',
//             }),
//         }),
//         setJsonSettings: build.mutation<User, SetJsonSettingsArg>({
//             query: ({ userId, jsonSettings }) => ({
//                 url: `/users/${userId}`,
//                 method: 'PATCH',
//                 body: {
//                     jsonSettings,
//                 },
//             }),
//         }),
//         getUsers: build.query<User[], null>({
//             query: () => ({
//                 url: '/users',
//             }),
//         }),
//     }),
// });

// export const setJsonSettingsMutation =
//     userApi.endpoints.setJsonSettings.initiate;
// // export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
// // export const useUsers = userApi.useGetUsersQuery;

// _______________________________________________________________________

// try {
//     const users = await fetchCollection<User>('users');
//     return { data: users };
// } catch (error) {
//     return { error };
// }
