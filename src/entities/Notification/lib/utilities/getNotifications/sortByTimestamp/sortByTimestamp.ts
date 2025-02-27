import {
    GeneralNotification,
    PersonalNotification,
} from '../../../../model/types/notification';
import { getTimestampMillis } from '../../getTimestampMillis/getTimestampMillis';

export const sortByTimestamp = (
    notifications: (GeneralNotification | PersonalNotification)[],
): (GeneralNotification | PersonalNotification)[] => {
    return notifications.sort((a, b) => {
        const timestampA = getTimestampMillis(a.timestamp);
        const timestampB = getTimestampMillis(b.timestamp);
        return timestampB - timestampA; // Descending order
    });
};
