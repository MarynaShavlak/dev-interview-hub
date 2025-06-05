import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { onSnapshot } from 'firebase/firestore';
import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';
import { ERROR_LINK_MESSAGES } from '../../../model/consts/errorLinkMessages';
import { createLinksQuery } from '../createLinksQuery/createLinksQuery';
import { Link } from '@/entities/Link';

export const subscribeToLinks = (
    updateCachedData: (updater: (draft: MaybeDrafted<Link[]>) => void) => void,
    userId: string,
) => {
    let unsubscribe: (() => void) | undefined;

    try {
        if (!userId) return undefined;
        const linksQuery = createLinksQuery(userId);

        unsubscribe = onSnapshot(linksQuery, (snapshot) => {
            updateCachedData((draft) => {
                const result = snapshot?.docs?.map((doc) =>
                    doc.data(),
                ) as Link[];
                return result;
            });
        });
    } catch (error) {
        handleRequestErrorMessage(
            ERROR_LINK_MESSAGES.LINKS_SNAPSHOT_FAIL,
            error,
        );
    }

    return unsubscribe;
};
