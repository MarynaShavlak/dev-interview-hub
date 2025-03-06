import { fetchPersonal } from '../fetchPersonal/fetchPersonal';
import { fetchGeneral } from '../fetchGeneral/fetchGeneral';
import { mergeNotifications } from '../mergeNotifications/mergeNotifications';
import { sortByTimestamp } from '../sortByTimestamp/sortByTimestamp';

export const fetchAllNotifications = async (userId: string) => {
    const generalNotifications = await fetchGeneral(userId);
    const personalNotifications = await fetchPersonal(userId);

    const allNotifications = mergeNotifications(
        generalNotifications,
        personalNotifications,
    );

    return sortByTimestamp(allNotifications);
};
