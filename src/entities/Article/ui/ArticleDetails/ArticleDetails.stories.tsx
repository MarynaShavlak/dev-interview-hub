import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { ArticleDetails } from './ArticleDetails';
import { testArticleData } from '../../testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Article/ArticleDetails',
    component: ArticleDetails,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetails>;

const Template: ComponentStory<typeof ArticleDetails> = (args) => (
    <ArticleDetails {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
    StoreDecorator({
        articleDetails: {
            data: testArticleData,
        },
    }),
];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [
    StoreDecorator({
        articleDetails: {
            isLoading: true,
        },
    }),
];

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [
    StoreDecorator({
        articleDetails: {
            error: 'error',
        },
    }),
];

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [
    StoreDecorator({
        articleDetails: {
            data: testArticleData,
        },
    }),
    NewDesignDecorator,
];

export const LoadingRedesigned = Template.bind({});
LoadingRedesigned.args = {};
LoadingRedesigned.decorators = [
    StoreDecorator({
        articleDetails: {
            isLoading: true,
        },
    }),
    NewDesignDecorator,
];

export const ErrorRedesigned = Template.bind({});
ErrorRedesigned.args = {};
ErrorRedesigned.decorators = [
    StoreDecorator({
        articleDetails: {
            error: 'error',
        },
    }),
    NewDesignDecorator,
];
