import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import {
    GeneralNotification,
    PersonalNotification,
} from '../../../model/types/notification';

export const getPreviousPersonalNotifications = (
    draft: MaybeDrafted<(PersonalNotification | GeneralNotification)[]>,
): PersonalNotification[] => {
    return draft.filter((n) => n.type !== 'general') as PersonalNotification[];
};
