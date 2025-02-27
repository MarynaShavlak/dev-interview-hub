import { mergeNotifications } from '../mergeNotifications/mergeNotifications';
import { getUniqueNotifications } from '../getUniqueNotifications/getUniqueNotifications';
import { sortByTimestamp } from '../sortByTimestamp/sortByTimestamp';
import {
    GeneralNotification,
    PersonalNotification,
} from '../../../../model/types/notification';

export const getAllCachedSorted = (
    general: GeneralNotification[],
    personal: PersonalNotification[],
) => {
    const allNotifications = mergeNotifications(general, personal);

    const uniqueNotifications = getUniqueNotifications(allNotifications);

    return sortByTimestamp(uniqueNotifications);
};
