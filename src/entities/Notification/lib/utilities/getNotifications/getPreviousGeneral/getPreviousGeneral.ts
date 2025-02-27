import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import {
    GeneralNotification,
    PersonalNotification,
} from '../../../../model/types/notification';

export const getPreviousGeneral = (
    draft: MaybeDrafted<(PersonalNotification | GeneralNotification)[]>,
): GeneralNotification[] => {
    return draft.filter((n) => n.type === 'general') as GeneralNotification[];
};
