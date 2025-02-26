import { NotificationType } from '../../../model/types/notification';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import CommentIcon from '@/shared/assets/icons/comment.svg';
import StarIcon from '@/shared/assets/icons/star.svg';

export const getNotificationItemIcon = (type: NotificationType) => {
    if (type === 'general') {
        return NotificationIcon;
    }
    if (type === 'personal_comment') {
        return CommentIcon;
    }
    if (type === 'personal_rating') {
        return StarIcon;
    }
    return NotificationIcon;
};
