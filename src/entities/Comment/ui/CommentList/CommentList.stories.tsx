import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentList } from './CommentList';
import {
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
};

const loadingArgs = {
    comments: [],
    isLoading: true,
};

export const Normal = Template.bind({});
Normal.args = normalArgs;

export const WithOneNoUserAvatarComment = Template.bind({});
WithOneNoUserAvatarComment.args = {
    comments: [testCommentNoUserAvatarData, testCommentData],
};

export const Loading = Template.bind({});
Loading.args = loadingArgs;

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = normalArgs;
NormalRedesigned.decorators = [NewDesignDecorator];

export const WithOneNoUserAvatarCommentRedesigned = Template.bind({});
WithOneNoUserAvatarCommentRedesigned.args = {
    comments: [testCommentNoUserAvatarData, testCommentData],
};
WithOneNoUserAvatarCommentRedesigned.decorators = [NewDesignDecorator];

export const LoadingRedesigned = Template.bind({});
LoadingRedesigned.args = loadingArgs;
LoadingRedesigned.decorators = [NewDesignDecorator];
