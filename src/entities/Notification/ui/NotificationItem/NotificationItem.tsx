import React, { memo } from 'react';
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
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { VStack } from '@/shared/ui/common/Stack';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

const NotificationContent = ({ item, className }: NotificationItemProps) => {
    const { title, message, timestamp, href } = item;
    console.log('href', href);
    const cardClass = classNames(cls.NotificationItem, {}, [className]);
    dayjs.extend(relativeTime);
    const timeSpent = dayjs(timestamp).fromNow();
    const flexClasses = getFlexClasses({ hStack: true, gap: '16' });
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <Card className={classNames(cardClass, {}, flexClasses)}>
                    <Icon
                        Svg={NotificationIcon}
                        width={40}
                        height={40}
                        className={cls.notificationItemIcon}
                    />
                    <VStack gap="4">
                        {/* {href ? ( */}
                        {/*    <AppLink */}
                        {/*        data-testid="ArticleListItem" */}
                        {/*        target="_blank" */}
                        {/*        to={getRouteArticleDetails(href)} */}
                        {/*    > */}
                        {/*        <Text title={title} text={message} bold /> */}
                        {/*    </AppLink> */}
                        {/* ) : ( */}
                        {/*    <Text title={title} text={message} bold /> */}
                        {/* )} */}
                        <Text title={title} text={message} bold />
                        <Text text={timeSpent} size="m" variant="secondary" />
                    </VStack>
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
