import { firestoreApi } from '@/shared/api/firestoreApi';

import {
    deleteDocFromFirestore,
    executeQuery,
    handleFirestoreSubscription,
} from '@/shared/lib/firestore';
import { ERROR_LINK_MESSAGES } from '../model/consts/errorLinkMessages';
import {
    NewLinkDraft,
    saveLinkToFirestore,
} from '../lib/utilities/saveLinkToFirestore/saveLinkToFirestore';
import { fetchLinksForUser } from '../lib/utilities/fetchLinksForUser/fetchLinksForUser';
import { subscribeToLinks } from '../lib/utilities/subscribeToLinks/subscribeToLinks';
import { updateLinkInFirestore } from '../lib/utilities/updateLinkInFirestore/updateLinkInFirestore';
import { Link } from '@/entities/Link';

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
                        () => fetchLinksForUser(userId),
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
                        () => saveLinkToFirestore(newLink),
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
                        async () => updateLinkInFirestore(linkId, updates),
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
