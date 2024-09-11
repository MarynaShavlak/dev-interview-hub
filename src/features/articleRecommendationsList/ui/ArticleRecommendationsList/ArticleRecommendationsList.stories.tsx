import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import ArticleRecommendationsList from './ArticleRecommendationsList';
import { testArticleData } from '@/entities/Article/testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        StoreDecorator({
            user: {
                authData: { id: '123' },
            },
        }),
    ],
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => (
    <ArticleRecommendationsList {...args} />
);

const normalParams = {
    mockData: [
        {
            url: `${__API__}/articles?_limit=3&_expand=user&id_ne=4`,
            method: 'GET',
            status: 200,
            response: [
                { ...testArticleData, id: '1' },
                { ...testArticleData, id: '2' },
                { ...testArticleData, id: '3' },
            ],
        },
    ],
};

const errorParams = {
    mockData: [
        {
            url: `${__API__}/articles?_limit=3&_expand=user&id_ne=4`,
            method: 'GET',
            status: 500,
            response: { message: 'Internal Server Error' },
        },
    ],
};

const emptyParams = {
    mockData: [
        {
            url: `${__API__}/articles?_limit=3&_expand=user&id_ne=4`,
            method: 'GET',
            status: 200,
            response: [],
        },
    ],
};

const loadingParams = {
    mockData: [
        {
            url: `${__API__}/articles?_limit=3&_expand=user&id_ne=4`,
            method: 'GET',
            status: 200,
            delay: 1000000000,
            response: [],
        },
    ],
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.parameters = normalParams;

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.parameters = normalParams;
NormalRedesigned.decorators = [NewDesignDecorator];

export const Error = Template.bind({});
Error.args = {};
Error.parameters = errorParams;

export const ErrorRedesigned = Template.bind({});
ErrorRedesigned.args = {};
ErrorRedesigned.parameters = errorParams;
ErrorRedesigned.decorators = [NewDesignDecorator];

export const NoRecommends = Template.bind({});
NoRecommends.args = {};
NoRecommends.parameters = emptyParams;

export const NoRecommendsRedesigned = Template.bind({});
NoRecommendsRedesigned.args = {};
NoRecommendsRedesigned.parameters = emptyParams;
NoRecommendsRedesigned.decorators = [NewDesignDecorator];

export const Loading = Template.bind({});
Loading.args = {};
Loading.parameters = loadingParams;

export const LoadingRedesigned = Template.bind({});
LoadingRedesigned.args = {};
LoadingRedesigned.parameters = loadingParams;
LoadingRedesigned.decorators = [NewDesignDecorator];
