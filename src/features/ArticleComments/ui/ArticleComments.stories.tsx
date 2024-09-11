import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleComments } from '..';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { testCommentsData } from '@/entities/Comment/testing';

export default {
    title: 'features/ArticleComments',
    component: ArticleComments,
    args: {
        id: '1',
    },
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleComments>;

const Template: ComponentStory<typeof ArticleComments> = (args) => (
    <ArticleComments {...args} />
);

const normalData = {
    ids: testCommentsData.map((comment) => comment.id),
    entities: testCommentsData.reduce((acc, comment) => {
        // @ts-ignore
        acc[comment.id] = comment;
        return acc;
    }, {}),
    isLoading: false,
    error: undefined,
};

const withNoInitialCommentsData = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
};

const loadingData = {
    ids: [],
    entities: {},
    isLoading: true,
    error: undefined,
};
const errorData = {
    ids: [],
    entities: {},
    isLoading: false,
    error: 'Failed to load comments',
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
    StoreDecorator({
        articleComments: normalData,
    }),
];

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [
    StoreDecorator({ articleComments: normalData }),
    NewDesignDecorator,
];

export const WithNoInitialComments = Template.bind({});
WithNoInitialComments.args = {};
WithNoInitialComments.decorators = [
    StoreDecorator({
        articleComments: withNoInitialCommentsData,
    }),
];

export const WithNoInitialCommentsRedesigned = Template.bind({});
WithNoInitialCommentsRedesigned.args = {};
WithNoInitialCommentsRedesigned.decorators = [
    StoreDecorator({ articleComments: withNoInitialCommentsData }),
    NewDesignDecorator,
];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [
    StoreDecorator({
        articleComments: loadingData,
    }),
];

export const LoadingRedesigned = Template.bind({});
LoadingRedesigned.args = {};
LoadingRedesigned.decorators = [
    StoreDecorator({
        articleComments: loadingData,
    }),
    NewDesignDecorator,
];

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [
    StoreDecorator({
        articleComments: errorData,
    }),
];

export const ErrorRedesigned = Template.bind({});
ErrorRedesigned.args = {};
ErrorRedesigned.decorators = [
    StoreDecorator({
        articleComments: errorData,
    }),
    NewDesignDecorator,
];
