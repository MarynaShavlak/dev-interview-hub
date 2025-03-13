import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { ArticleInfiniteList } from './ArticleInfiniteList';
import { baseArgs } from '../../testing';
import { ArticleView } from '@/entities/Article';
import { EmptyArticleInfiniteList } from './EmptyArticleInfiniteList/EmptyArticleInfiniteList';

export default {
    title: 'pages/ArticlesPage/ArticleInfiniteList',
    component: ArticleInfiniteList,
    argTypes: {
        onInfiniteScroll: { action: 'onInfiniteScroll' },
    },
    args: {},
} as ComponentMeta<typeof ArticleInfiniteList>;

const Template: ComponentStory<typeof ArticleInfiniteList> = (args) => (
    <ArticleInfiniteList {...args} />
);

const loadingState = {
    isLoading: true,
    ids: [],
    entities: {},
};

const errorState = {
    isLoading: false,
    ids: [],
    entities: {},
    error: 'Failed to load articles',
};

export const Grid = Template.bind({});
Grid.decorators = [StoreDecorator(baseArgs)];

export const List = Template.bind({});
List.decorators = [StoreDecorator(baseArgs)];

export const LoadingGrid = Template.bind({});
LoadingGrid.args = {};
LoadingGrid.decorators = [
    StoreDecorator({
        articlesPage: {
            ...loadingState,
            view: ArticleView.GRID,
        },
    }),
];

export const LoadingList = Template.bind({});
LoadingList.args = {};
LoadingList.decorators = [
    StoreDecorator({
        articlesPage: {
            ...loadingState,
            view: ArticleView.LIST,
        },
    }),
];

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [
    StoreDecorator({
        articlesPage: {
            ...errorState,
            view: ArticleView.GRID,
        },
    }),
];

export const Empty = Template.bind({});
Empty.decorators = [() => <EmptyArticleInfiniteList />, StoreDecorator({})];
