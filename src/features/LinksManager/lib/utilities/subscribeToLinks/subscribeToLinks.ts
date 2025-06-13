import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { ERROR_LINK_MESSAGES } from '../../../model/consts/errorLinkMessages';
import { Link } from '@/entities/Link';
import { subscribeToUserCollection } from '@/shared/lib/firestore';

export const subscribeToLinks = (
    updateCachedData: (updater: (draft: MaybeDrafted<Link[]>) => void) => void,
    userId: string,
) => {
    return subscribeToUserCollection<Link>(
        'links',
        userId,
        updateCachedData,
        ERROR_LINK_MESSAGES.LINKS_SNAPSHOT_FAIL,
    );
};
