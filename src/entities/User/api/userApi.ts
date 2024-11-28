import { getDoc, updateDoc } from 'firebase/firestore';
import { firestoreApi, rtkApi } from '@/shared/api/rtkApi';
import { User } from '../model/types/user';
import { JsonSettings } from '../model/types/jsonSettings';
import { getUserDocRefById } from '../lib/utilities/getUserDocRefById/getUserDocRefById';
import { fetchCollection } from '@/shared/lib/firestore/fetchCollection/fetchCollection';
import { fetchDocumentByRef } from '@/shared/lib/firestore/fetchDocumentByRef/fetchDocumentByRef';
import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';

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
// export const useUsers = userApi.useGetUsersQuery;

// _______________________________________________________________________

export const userFirebaseApi = firestoreApi.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<User[], void>({
            async queryFn() {
                try {
                    const users = await fetchCollection<User>('users');
                    return { data: users };
                } catch (error) {
                    return { error };
                }
            },
        }),
        getUserDataById: build.query<User, string>({
            async queryFn(userId) {
                try {
                    const userDocRef = await getDocRefByField<User>(
                        'users',
                        'id',
                        userId,
                    );

                    const userData = await fetchDocumentByRef<User>(userDocRef);
                    return { data: userData };
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

export const useUsers = userFirebaseApi.useGetUsersQuery;

export const useGetUserDataById = userFirebaseApi.useGetUserDataByIdQuery;

// const userDocRef = doc(firestore, 'users', userId);
// console.log('data', userDocRef);
// const docSnapshot = await getDoc(userDocRef);
// console.log('data', docSnapshot);
