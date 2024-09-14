import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import ArticlesPage from './ArticlesPage';
import { ArticleView } from '@/entities/Article';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { CustomStylesDecorator } from '@/shared/config/storybook/CustomStylesDecorator/CustomStylesDecorator';
import { articlesNormalizedData } from '@/entities/Article/testing';

export default {
    title: 'pages/ArticlesPage/ArticlesPage',
    component: ArticlesPage,
    argTypes: {
        onInfiniteScroll: { action: 'onInfiniteScroll' },
    },
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = (args) => (
    <ArticlesPage {...args} />
);

const firstVisitData = {
    articlesPage: {
        ...articlesNormalizedData,
        view: ArticleView.GRID,
        isLoading: false,
    },
    user: {
        authData: { jsonSettings: { isArticlesPageWasOpened: false } },
    },
};

const notFirstVisitData = {
    articlesPage: {
        ...articlesNormalizedData,
        view: ArticleView.GRID,
        isLoading: false,
    },
    user: {
        authData: { jsonSettings: { isArticlesPageWasOpened: true } },
    },
};

export const FirstArticlesPageVisit = Template.bind({});
FirstArticlesPageVisit.args = {};
FirstArticlesPageVisit.decorators = [StoreDecorator(firstVisitData)];

export const NotFirstArticlesPageVisit = Template.bind({});
NotFirstArticlesPageVisit.args = {};
NotFirstArticlesPageVisit.decorators = [StoreDecorator(notFirstVisitData)];

export const FirstArticlesPageVisitRedesigned = Template.bind({});
FirstArticlesPageVisitRedesigned.args = {};
FirstArticlesPageVisitRedesigned.decorators = [
    StoreDecorator(firstVisitData),
    CustomStylesDecorator({ paddingRight: '80px' }),
    NewDesignDecorator,
];

export const NotFirstArticlesPageVisitRedesigned = Template.bind({});
NotFirstArticlesPageVisitRedesigned.args = {};
NotFirstArticlesPageVisitRedesigned.decorators = [
    StoreDecorator(notFirstVisitData),
    CustomStylesDecorator({ paddingRight: '80px' }),
    NewDesignDecorator,
];
