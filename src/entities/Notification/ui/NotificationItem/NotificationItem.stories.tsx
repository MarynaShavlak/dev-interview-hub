import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
    testCommentPersonalNotification,
    testGeneralNotification,
    testRatingPersonalNotification,
    testRatingWithFeedbackPersonalNotification,
} from '../../testing';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { NotificationItem } from './NotificationItem';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export {};

export default {
    title: 'entities/Notification/NotificationItem',
    component: NotificationItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => (
    <NotificationItem {...args} />
);
const normalCommentPersonalArgs = {
    item: testCommentPersonalNotification,
};

const normalRatingPersonalArgs = {
    item: testRatingPersonalNotification,
};

const normalRatingWithFeedbackPersonalArgs = {
    item: testRatingWithFeedbackPersonalNotification,
};
const normalGeneralArgs = {
    item: testGeneralNotification,
};
export const NormalGeneralNotification = Template.bind({});
NormalGeneralNotification.args = normalGeneralArgs;

export const NormalGeneralNotificationRedesigned = Template.bind({});
NormalGeneralNotificationRedesigned.args = normalGeneralArgs;
NormalGeneralNotificationRedesigned.decorators = [NewDesignDecorator];

export const NormalCommentPersonalNotification = Template.bind({});
NormalCommentPersonalNotification.args = normalCommentPersonalArgs;

export const NormalCommentPersonalNotificationRedesigned = Template.bind({});
NormalCommentPersonalNotificationRedesigned.args = normalCommentPersonalArgs;
NormalCommentPersonalNotificationRedesigned.decorators = [NewDesignDecorator];

export const NormalRatingPersonalNotification = Template.bind({});
NormalRatingPersonalNotification.args = normalRatingPersonalArgs;

export const NormalRatingPersonalNotificationRedesigned = Template.bind({});
NormalRatingPersonalNotificationRedesigned.args = normalRatingPersonalArgs;
NormalRatingPersonalNotificationRedesigned.decorators = [NewDesignDecorator];

export const NormalRatingWithFeedbackPersonalNotification = Template.bind({});
NormalRatingWithFeedbackPersonalNotification.args =
    normalRatingWithFeedbackPersonalArgs;

export const NormalRatingWithFeedbackPersonalNotificationRedesigned =
    Template.bind({});
NormalRatingWithFeedbackPersonalNotificationRedesigned.args =
    normalRatingWithFeedbackPersonalArgs;
NormalRatingWithFeedbackPersonalNotificationRedesigned.decorators = [
    NewDesignDecorator,
];
