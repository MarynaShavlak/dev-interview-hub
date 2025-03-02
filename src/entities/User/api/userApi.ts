import { firestoreApi } from '@/shared/api/firestoreApi';
import { User } from '../model/types/user';
import { executeQuery } from '@/shared/lib/firestore/executeQuery/executeQuery';

import { fetchUser } from '../lib/utilities/fetchUser/fetchUser';
import { ERROR_USER_MESSAGES } from '../model/consts/errorUserMessages';
import { subscribeToUser } from '../lib/utilities/subscribeToUser/subscribeToUser';
import { handleFirestoreSubscription } from '@/shared/lib/firestore/handleFirestoreSubscription/handleFirestoreSubscription';

import { deleteDocFromFirestore } from '@/shared/lib/firestore/deleteDocFromFirestore/deleteDocFromFirestore';
import { updateUserInFirestore } from '../lib/utilities/updateUserInFirestore/updateUserInFirestore';

import { subscribeToAllUsers } from '../lib/utilities/subscribeToAllUsers/subscribeToAllUsers';
import { fetchCollectionDocsData } from '@/shared/lib/firestore/fetchCollectionDocsData/fetchCollectionDocsData';

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
                    return executeQuery(
                        () => fetchCollectionDocsData<User>('users'),
                        ERROR_USER_MESSAGES.USERS_FETCH_FAIL,
                    );
                },
                async onCacheEntryAdded(
                    _,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    handleFirestoreSubscription({
                        subscriptionFn: subscribeToAllUsers, // Subscription function
                        updateFn: updateCachedData, // Callback function to update cache
                        dependency: null, // Dependency
                        cacheDataLoaded, // Promise for cache data loading
                        cacheEntryRemoved, // Promise for cache entry removal
                    });
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
                    return executeQuery(
                        async () => updateUserInFirestore(userId, updates),
                        ERROR_USER_MESSAGES.UPDATE_USER_ERROR(userId),
                    );
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
