import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentList } from './CommentList';
import {
    mockDeleteComment,
    testCommentData,
    testCommentNoUserAvatarData,
    testCommentsData,
} from '../../testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Comment/CommentList',
    component: CommentList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => (
    <CommentList {...args} />
);

const normalArgs = {
    comments: testCommentsData,
    canDeleteComments: false,
};
const withDeleteArgs = {
    comments: testCommentsData,
    canDeleteComments: true,
    deleteComment: mockDeleteComment,
};

const loadingArgs = {
    comments: [],
    isLoading: true,
};

export const Default = Template.bind({});
Default.args = normalArgs;

export const SingleCommentNoAvatar = Template.bind({});
SingleCommentNoAvatar.args = {
    comments: [testCommentNoUserAvatarData, testCommentData],
};

export const WithDeletePermission = Template.bind({});
WithDeletePermission.args = withDeleteArgs;

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = normalArgs;
DefaultRedesigned.decorators = [NewDesignDecorator];

export const WithDeletePermissionRedesigned = Template.bind({});
WithDeletePermissionRedesigned.args = withDeleteArgs;
WithDeletePermissionRedesigned.decorators = [NewDesignDecorator];

export const SingleCommentNoAvatarRedesigned = Template.bind({});
SingleCommentNoAvatarRedesigned.args = {
    comments: [testCommentNoUserAvatarData, testCommentData],
};
SingleCommentNoAvatarRedesigned.decorators = [NewDesignDecorator];

export const LoadingState = Template.bind({});
LoadingState.args = loadingArgs;
export const LoadingStateRedesigned = Template.bind({});
LoadingStateRedesigned.args = loadingArgs;
LoadingStateRedesigned.decorators = [NewDesignDecorator];

export const EmptyCommentList = Template.bind({});
EmptyCommentList.args = {
    comments: [],
    canDeleteComments: false,
};

export const EmptyCommentListRedesigned = Template.bind({});
EmptyCommentListRedesigned.args = {
    comments: [],
    canDeleteComments: false,
};
EmptyCommentListRedesigned.decorators = [NewDesignDecorator];

export const ErrorState = Template.bind({});
ErrorState.args = {
    comments: [],
    error: 'Failed to load comments',
};

export const ErrorStateRedesigned = Template.bind({});
ErrorStateRedesigned.args = {
    comments: [],
    error: 'Failed to load comments',
};
ErrorStateRedesigned.decorators = [NewDesignDecorator];
