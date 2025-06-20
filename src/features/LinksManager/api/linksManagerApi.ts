import { firestoreApi } from '@/shared/api/firestoreApi';

import {
    deleteDocFromFirestore,
    executeQuery,
    fetchCollectionForUser,
    handleFirestoreSubscription,
    saveDocToFirestore,
} from '@/shared/lib/firestore';
import { ERROR_LINK_MESSAGES } from '../model/consts/errorLinkMessages';

import { subscribeToLinks } from '../lib/utilities/subscribeToLinks/subscribeToLinks';
import { Link } from '@/entities/Link';
import { updateDocById } from '@/shared/lib/firestore/updateDocById/updateDocById';

export type NewLinkDraft = Omit<Link, 'createdAt'>;

export const linksManagerFirebaseApi = firestoreApi
    .enhanceEndpoints({ addTagTypes: ['LinksManager'] })
    .injectEndpoints({
        endpoints: (build) => ({
            getLinksByUser: build.query<Link[], string>({
                providesTags: [{ type: 'LinksManager', id: 'linkId' }],
                keepUnusedDataFor: 3600,
                async queryFn(userId: string) {
                    if (!userId) {
                        return {
                            error: new Error(
                                ERROR_LINK_MESSAGES.USER_NOT_FOUND,
                            ),
                        };
                    }

                    return executeQuery(
                        () => fetchCollectionForUser<Link>('links', userId),
                        ERROR_LINK_MESSAGES.LINKS_BY_USER_ID_FETCH_FAIL(userId),
                    );
                },
                async onCacheEntryAdded(
                    userId,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    handleFirestoreSubscription({
                        subscriptionFn: subscribeToLinks,
                        updateFn: updateCachedData,
                        dependency: userId,
                        cacheDataLoaded,
                        cacheEntryRemoved,
                    });
                },
            }),
            addLink: build.mutation<Link, NewLinkDraft>({
                invalidatesTags: [{ type: 'LinksManager', id: 'linkId' }],
                async queryFn(newLink) {
                    return executeQuery(
                        () =>
                            saveDocToFirestore<Link>(
                                'links',
                                newLink,
                                ERROR_LINK_MESSAGES.LINK_RETRIEVAL_FAIL,
                            ),
                        ERROR_LINK_MESSAGES.ADD_LINK_FAIL,
                    );
                },
            }),
            deleteLink: build.mutation<string, string>({
                invalidatesTags: ['LinksManager'],
                async queryFn(linkId) {
                    return executeQuery(
                        () => deleteDocFromFirestore('links', linkId),
                        ERROR_LINK_MESSAGES.DELETE_ERROR,
                    );
                },
            }),
            updateLink: build.mutation<
                Link,
                { linkId: string; updates: Partial<Link> }
            >({
                async queryFn({ linkId, updates }) {
                    return executeQuery(
                        async () => updateDocById('links', linkId, updates),
                        ERROR_LINK_MESSAGES.UPDATE_LINK_ERROR(linkId),
                    );
                },
            }),
        }),
    });

export const addLinkMutation =
    linksManagerFirebaseApi.endpoints.addLink.initiate;

export const useLinksByUser = linksManagerFirebaseApi.useGetLinksByUserQuery;

export const deleteLinkMutation =
    linksManagerFirebaseApi.endpoints.deleteLink.initiate;

export const updateLinkMutation =
    linksManagerFirebaseApi.endpoints.updateLink.initiate;
