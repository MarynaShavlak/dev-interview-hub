import { getDoc, updateDoc } from 'firebase/firestore';
import { firestoreApi, rtkApi } from '@/shared/api/rtkApi';
import { User } from '../model/types/user';
import { JsonSettings } from '../model/types/jsonSettings';
import { getUserDocRefById } from '../lib/utilities/getUserDocRefById/getUserDocRefById';

interface SetJsonSettingsArg {
    userId: string;
    jsonSettings: JsonSettings;
}

export const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUserDataById: build.query<User, string>({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'GET',
            }),
        }),
        setJsonSettings: build.mutation<User, SetJsonSettingsArg>({
            query: ({ userId, jsonSettings }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: {
                    jsonSettings,
                },
            }),
        }),
        getUsers: build.query<User[], null>({
            query: () => ({
                url: '/users',
            }),
        }),
    }),
});

export const setJsonSettingsMutation =
    userApi.endpoints.setJsonSettings.initiate;
// export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
export const useUsers = userApi.useGetUsersQuery;

// _______________________________________________________________________

export const userFirebaseApi = firestoreApi.injectEndpoints({
    endpoints: (build) => ({
        getUserDataById: build.query<User, string>({
            async queryFn(userId) {
                try {
                    const userDocRef = await getUserDocRefById(userId);
                    if (userDocRef) {
                        const userDoc = await getDoc(userDocRef);
                        const userData = userDoc.data();
                        if (userData) {
                            return { data: { ...userData } as User };
                        }
                    }
                    return {
                        error: { name: 'NotFound', message: 'User not found' },
                    };
                    // const userDocRef = await getUserDocRefById(userId);
                    // if (!userDocRef) {
                    //     return {
                    //         error: {
                    //             name: 'NotFound',
                    //             message: 'User not found',
                    //         },
                    //     };
                    // }
                    //
                    // // Use a custom promise to integrate onSnapshot with async queryFn
                    // return await new Promise((resolve) => {
                    //     const unsubscribe = onSnapshot(
                    //         userDocRef,
                    //         (snapshot) => {
                    //             if (snapshot.exists()) {
                    //                 const userData = snapshot.data();
                    //                 resolve({ data: { ...userData } as User });
                    //             } else {
                    //                 resolve({
                    //                     error: {
                    //                         name: 'NotFound',
                    //                         message: 'User not found',
                    //                     },
                    //                 });
                    //             }
                    //         },
                    //         (error) => {
                    //             resolve({ error });
                    //         },
                    //     );
                    //
                    //     // Abort listener on cancellation
                    //     signal?.addEventListener('abort', () => {
                    //         unsubscribe();
                    //         resolve({
                    //             error: {
                    //                 name: 'Aborted',
                    //                 message: 'Listener aborted',
                    //             },
                    //         });
                    //     });
                    // });
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
                        console.log('updated DATA', updatedData);
                        if (updatedData) {
                            return {
                                data: {
                                    // id: userDocRef.id,
                                    ...updatedData,
                                } as User,
                            };
                        }
                    }
                    return {
                        error: { name: 'NotFound', message: 'User not found' },
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

export const useGetUserDataById = userFirebaseApi.useGetUserDataByIdQuery;

// const userDocRef = doc(firestore, 'users', userId);
// console.log('data', userDocRef);
// const docSnapshot = await getDoc(userDocRef);
// console.log('data', docSnapshot);
