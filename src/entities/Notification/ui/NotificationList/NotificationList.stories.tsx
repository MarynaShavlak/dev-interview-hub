import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NotificationList } from './NotificationList';

import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NotificationListSkeleton } from '../NotificationListSkeleton/NotificationListSkeleton';
import { EmptyNotificationsList } from '../EmptyNotificationsList/EmptyNotificationsList';
import { ErrorNotificationsList } from '../ErrorNotificationsList/ErrorNotificationsList';

export default {
    title: 'entities/Notification/NotificationList',
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => (
    <NotificationList {...args} />
);

const normalArgs = {
    userId: '2CuQOzOQ9YeU7bFzncJh8YwGZGI2',
};

export const Default = Template.bind({});
Default.args = normalArgs;

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = normalArgs;
DefaultRedesigned.decorators = [NewDesignDecorator];

export const EmptyList = Template.bind({});
EmptyList.args = normalArgs;
EmptyList.decorators = [() => <EmptyNotificationsList />];

export const EmptyListRedesigned = Template.bind({});
EmptyListRedesigned.args = normalArgs;
EmptyListRedesigned.decorators = [
    () => <EmptyNotificationsList />,
    NewDesignDecorator,
];
export const LoadingState = Template.bind({});
LoadingState.args = normalArgs;
LoadingState.decorators = [() => <NotificationListSkeleton />];

export const LoadingStateRedesigned = Template.bind({});
LoadingStateRedesigned.args = normalArgs;
LoadingStateRedesigned.decorators = [
    () => <NotificationListSkeleton />,
    NewDesignDecorator,
];

export const ErrorStateNotifications = Template.bind({});
ErrorStateNotifications.args = normalArgs;
ErrorStateNotifications.decorators = [() => <ErrorNotificationsList />];

export const ErrorStateNotificationsRedesigned = Template.bind({});
ErrorStateNotificationsRedesigned.args = normalArgs;
ErrorStateNotificationsRedesigned.decorators = [
    () => <ErrorNotificationsList />,
    NewDesignDecorator,
];
