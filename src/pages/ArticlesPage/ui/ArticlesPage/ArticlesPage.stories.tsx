import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import ArticlesPage from './ArticlesPage';
import { ArticleView } from '@/entities/Article';
import { articlesNormalizedData } from '@/entities/Article/testing';
import { CustomStylesDecorator } from '@/shared/config/storybook/CustomStylesDecorator/CustomStylesDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ArticlesPageSkeleton } from '../ArticlesPageSkeleton/ArticlesPageSkeleton';

// import { articlesNormalizedData } from '@/entities/Article/testing';

export default {
    title: 'pages/ArticlesPage/ArticlesPage',
    component: ArticlesPage,
    argTypes: {
        onInfiniteScroll: { action: 'onInfiniteScroll' },
    },
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = (args) => (
    <ArticlesPage />
);

const baseArgs = {
    articlesPage: {
        ...articlesNormalizedData,
        view: ArticleView.GRID,
        isLoading: false,
    },
};

const firstVisitData = {
    ...baseArgs,
    user: {
        authData: {
            id: '2CuQOzOQ9YeU7bFzncJh8YwGZGI2',
            jsonSettings: { isArticlesPageWasOpened: false },
        },
    },
};

const notFirstVisitData = {
    ...baseArgs,
    user: {
        authData: { jsonSettings: { isArticlesPageWasOpened: true } },
    },
};

export const FirstArticlesPageVisit = Template.bind({});
FirstArticlesPageVisit.args = {};
FirstArticlesPageVisit.decorators = [StoreDecorator(firstVisitData)];

export const FirstArticlesPageVisitRedesigned = Template.bind({});
FirstArticlesPageVisitRedesigned.args = {};
FirstArticlesPageVisitRedesigned.decorators = [
    StoreDecorator(firstVisitData),
    CustomStylesDecorator({ paddingRight: '80px' }),
    NewDesignDecorator,
];

export const NotFirstArticlesPageVisit = Template.bind({});
NotFirstArticlesPageVisit.args = {};
NotFirstArticlesPageVisit.decorators = [StoreDecorator(notFirstVisitData)];

export const NotFirstArticlesPageVisitRedesigned = Template.bind({});
NotFirstArticlesPageVisitRedesigned.args = {};
NotFirstArticlesPageVisitRedesigned.decorators = [
    StoreDecorator(notFirstVisitData),
    CustomStylesDecorator({ paddingRight: '80px' }),
    NewDesignDecorator,
];

export const Loading = Template.bind({});
Loading.decorators = [() => <ArticlesPageSkeleton />];
export const LoadingRedesigned = Template.bind({});
LoadingRedesigned.decorators = [
    () => <ArticlesPageSkeleton />,
    NewDesignDecorator,
];
