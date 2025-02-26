import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from '../NotificationItem.module.scss';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { useNotificationLogic } from '../../../lib/hooks/useNotificationLogic/useNotificationLogic';
import { NotificationItemProps } from '../NotificationItem';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card';
import {
    Text as TextDeprecated,
    TextSize,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import { Icon, Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { VStack } from '@/shared/ui/common/Stack';
import CloseIcon from '@/shared/assets/icons/close.svg';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';

export const NotificationItemDeprecated = memo(
    (props: NotificationItemProps) => {
        const { className, item } = props;
        const { title, message, href } = item;
        const cardClass = classNames(cls.NotificationItem, {}, [className]);
        const flexClasses = getFlexClasses({
            hStack: true,
            gap: '8',
        });

        const { timeSpent, handleDeleteNotification } =
            useNotificationLogic(item);

        return (
            <CardDeprecated
                className={classNames(cardClass, {}, flexClasses)}
                theme={CardTheme.OUTLINED}
            >
                <IconDeprecated
                    Svg={NotificationIcon}
                    width={40}
                    height={40}
                    className={cls.notificationItemIcon}
                />
                <VStack gap="4">
                    {href ? (
                        <a
                            className={classNames(cls.link, {}, [
                                cls.linkDeprecated,
                            ])}
                            target="_blank"
                            href={href}
                            rel="noreferrer"
                        >
                            <TextDeprecated title={title} text={message} />
                        </a>
                    ) : (
                        <TextDeprecated title={title} text={message} />
                    )}
                    <TextDeprecated
                        text={timeSpent}
                        size={TextSize.M}
                        theme={TextTheme.INVERTED}
                    />
                    <ButtonDeprecated
                        theme={ButtonTheme.CLEAR}
                        onClick={handleDeleteNotification}
                    >
                        <Icon
                            Svg={CloseIcon}
                            className={cls.closeIconDeprecated}
                            width={32}
                            height={32}
                        />
                    </ButtonDeprecated>
                </VStack>
            </CardDeprecated>
        );
    },
);
