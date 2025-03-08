import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleComments } from '..';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/ArticleComments',
    component: ArticleComments,
    // args: {
    //     id: '1',
    // },
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleComments>;

const Template: ComponentStory<typeof ArticleComments> = (args) => (
    <ArticleComments {...args} />
);

// const normalData = {
//     ids: testCommentsData.map((comment) => comment.id),
//     entities: testCommentsData.reduce((acc, comment) => {
//         // @ts-ignore
//         acc[comment.id] = comment;
//         return acc;
//     }, {}),
//     isLoading: false,
//     error: undefined,
// };

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

const normalArgs = { id: '1' };

export const Normal = Template.bind({});
Normal.args = normalArgs;
Normal.decorators = [StoreDecorator({})];

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = normalArgs;
NormalRedesigned.decorators = [StoreDecorator({}), NewDesignDecorator];

export const WithNoInitialComments = Template.bind({});
WithNoInitialComments.args = { id: '2' };
WithNoInitialComments.decorators = [StoreDecorator({})];

export const WithNoInitialCommentsRedesigned = Template.bind({});
WithNoInitialCommentsRedesigned.args = { id: '2' };
WithNoInitialCommentsRedesigned.decorators = [
    StoreDecorator({}),
    NewDesignDecorator,
];

// export const LoadingState = Template.bind({});
// LoadingState.args = normalArgs;
// LoadingState.decorators = [() => <NotificationListSkeleton />];
//
// export const LoadingStateRedesigned = Template.bind({});
// LoadingStateRedesigned.args = normalArgs;
// LoadingStateRedesigned.decorators = [
//     () => <NotificationListSkeleton />,
//     NewDesignDecorator,
// ];
//
// export const ErrorStateArticleComments = Template.bind({});
// ErrorStateArticleComments.args = normalArgs;
// ErrorStateArticleComments.decorators = [() => <ErrorNotificationsList />];
//
// export const ErrorStateArticleCommentsRedesigned = Template.bind({});
// ErrorStateArticleCommentsRedesigned.args = normalArgs;
// ErrorStateArticleCommentsRedesigned.decorators = [
//     () => <ErrorNotificationsList />,
//     NewDesignDecorator,
// ];
