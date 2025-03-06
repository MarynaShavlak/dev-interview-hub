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
export const GeneralNotification = Template.bind({});
GeneralNotification.args = normalGeneralArgs;

export const GeneralNotificationRedesigned = Template.bind({});
GeneralNotificationRedesigned.args = normalGeneralArgs;
GeneralNotificationRedesigned.decorators = [NewDesignDecorator];

export const CommentPersonalNotification = Template.bind({});
CommentPersonalNotification.args = normalCommentPersonalArgs;

export const CommentPersonalNotificationRedesigned = Template.bind({});
CommentPersonalNotificationRedesigned.args = normalCommentPersonalArgs;
CommentPersonalNotificationRedesigned.decorators = [NewDesignDecorator];

export const RatingPersonalNotification = Template.bind({});
RatingPersonalNotification.args = normalRatingPersonalArgs;

export const RatingPersonalNotificationRedesigned = Template.bind({});
RatingPersonalNotificationRedesigned.args = normalRatingPersonalArgs;
RatingPersonalNotificationRedesigned.decorators = [NewDesignDecorator];

export const RatingWithFeedbackPersonalNotification = Template.bind({});
RatingWithFeedbackPersonalNotification.args =
    normalRatingWithFeedbackPersonalArgs;

export const RatingWithFeedbackPersonalNotificationRedesigned = Template.bind(
    {},
);
RatingWithFeedbackPersonalNotificationRedesigned.args =
    normalRatingWithFeedbackPersonalArgs;
RatingWithFeedbackPersonalNotificationRedesigned.decorators = [
    NewDesignDecorator,
];
