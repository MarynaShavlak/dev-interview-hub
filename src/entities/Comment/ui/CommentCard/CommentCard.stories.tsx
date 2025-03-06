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

// Mock deleteComment function
const mockDeleteComment = async (commentId: string) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Comment with ID ${commentId} deleted.`);
            resolve(true);
        }, 500);
    });
};

const normalArgs = {
    comment: testCommentData,
    canDeleteComments: false,
};

const withDeleteArgs = {
    comment: testCommentData,
    canDeleteComments: true,
    deleteComment: mockDeleteComment,
};

const noUserAvatarArgs = {
    comment: testCommentNoUserAvatarData,
    canDeleteComments: false,
};

const loadingArgs = {
    isLoading: true,
};

export const WithUserAvatar = Template.bind({});
WithUserAvatar.args = normalArgs;

export const WithUserAvatarCanDelete = Template.bind({});
WithUserAvatarCanDelete.args = withDeleteArgs;

export const NoUserAvatar = Template.bind({});
NoUserAvatar.args = noUserAvatarArgs;

export const Loading = Template.bind({});
Loading.args = loadingArgs;

export const WithUserAvatarRedesigned = Template.bind({});
WithUserAvatarRedesigned.args = normalArgs;
WithUserAvatarRedesigned.decorators = [NewDesignDecorator];

export const WithUserAvatarCanDeleteRedesigned = Template.bind({});
WithUserAvatarCanDeleteRedesigned.args = withDeleteArgs;
WithUserAvatarCanDeleteRedesigned.decorators = [NewDesignDecorator];

export const NoUserAvatarRedesigned = Template.bind({});
NoUserAvatarRedesigned.args = noUserAvatarArgs;
NoUserAvatarRedesigned.decorators = [NewDesignDecorator];

export const LoadingRedesigned = Template.bind({});
LoadingRedesigned.args = loadingArgs;
LoadingRedesigned.decorators = [NewDesignDecorator];
