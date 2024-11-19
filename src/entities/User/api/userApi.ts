import { doc, getDoc } from 'firebase/firestore';
import { firestoreApi, rtkApi } from '@/shared/api/rtkApi';
import { User, UserFullInfo } from '../model/types/user';
import { JsonSettings } from '../model/types/jsonSettings';
import { firestore } from '../../../../json-server/firebase';

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

export const userFirebaseApi = firestoreApi.injectEndpoints({
    endpoints: (build) => ({
        getUserDataById: build.query<UserFullInfo, string>({
            async queryFn(userId) {
                try {
                    const userDocRef = doc(firestore, 'users', userId);
                    console.log('data', userDocRef);
                    const docSnapshot = await getDoc(userDocRef);
                    console.log('data', docSnapshot);
                    if (docSnapshot.exists()) {
                        return {
                            data: {
                                id: docSnapshot.id,
                                ...docSnapshot.data(),
                            } as UserFullInfo,
                        };
                    }
                    return {
                        error: { name: 'NotFound', message: 'User not found' },
                    };
                } catch (error) {
                    return { error };
                }
            },
        }),
    }),
});

export const getUserDataByIdQuery =
    userFirebaseApi.endpoints.getUserDataById.initiate;
