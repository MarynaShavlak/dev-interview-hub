import { memo } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './NotificationItem.module.scss';
import { Notification } from '../../model/types/notification';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

const NotificationContent = ({ item, className }: NotificationItemProps) => {
    const { title, message, timestamp } = item;
    const cardClass = classNames(cls.NotificationItem, {}, [className]);
    dayjs.extend(relativeTime);
    const timeSpent = dayjs(timestamp).fromNow();
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <Card className={cardClass}>
                    <Text title={title} text={message} bold />
                    <Text text={timeSpent} size="m" variant="secondary" />
                </Card>
            }
            off={
                <CardDeprecated
                    theme={CardTheme.OUTLINED}
                    className={cardClass}
                >
                    <TextDeprecated title={title} text={message} />
                </CardDeprecated>
            }
        />
    );
};

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props;

    const content = <NotificationContent item={item} className={className} />;

    if (item.href) {
        return (
            <a
                className={cls.link}
                target="_blank"
                href={item.href}
                rel="noreferrer"
            >
                {content}
            </a>
        );
    }

    return content;
});
