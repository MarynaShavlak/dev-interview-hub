import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentCard } from './CommentCard';
import { testCommentData, testCommentNoUserAvatarData } from '../../testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Comment/CommentCard',
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
    <CommentCard {...args} />
);

const normalArgs = {
    comment: testCommentData,
};

const noUserAvatarArgs = {
    comment: testCommentNoUserAvatarData,
};

const loadingArgs = {
    isLoading: true,
};

export const WithUserAvatar = Template.bind({});
WithUserAvatar.args = normalArgs;

export const NoUserAvatar = Template.bind({});
NoUserAvatar.args = noUserAvatarArgs;

export const Loading = Template.bind({});
Loading.args = loadingArgs;

export const WithUserAvatarRedesigned = Template.bind({});
WithUserAvatarRedesigned.args = normalArgs;
WithUserAvatarRedesigned.decorators = [NewDesignDecorator];

export const NoUserAvatarRedesigned = Template.bind({});
NoUserAvatarRedesigned.args = noUserAvatarArgs;
NoUserAvatarRedesigned.decorators = [NewDesignDecorator];

export const LoadingRedesigned = Template.bind({});
LoadingRedesigned.args = loadingArgs;
LoadingRedesigned.decorators = [NewDesignDecorator];
