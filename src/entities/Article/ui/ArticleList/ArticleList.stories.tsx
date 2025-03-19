import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleList } from './ArticleList';
import { ArticleView } from '../..';
import { testArticlesListData } from '../../testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Article/ArticleList',
    component: ArticleList,
    argTypes: {
        backgroundColor: { control: 'color' },
        options: [ArticleView.GRID, ArticleView.LIST, ArticleView.SEQUENCE],
    },
} as ComponentMeta<typeof ArticleList>;

const Template: ComponentStory<typeof ArticleList> = (args) => (
    <ArticleList {...args} />
);

const defaultArgs = {
    articlesToRender: testArticlesListData,
    isLoading: false,
    page: 0,
};

const loadingArgs = {
    articlesToRender: [],
    isLoading: true,
    page: 0,
};

const gridArgs = {
    ...defaultArgs,
    view: ArticleView.GRID,
};

const listArgs = {
    ...defaultArgs,
    view: ArticleView.LIST,
};

const sequenceArgs = {
    ...defaultArgs,
    view: ArticleView.SEQUENCE,
};
const gridLoadingArgs = {
    ...loadingArgs,
    view: ArticleView.GRID,
};

const listLoadingArgs = {
    ...loadingArgs,
    view: ArticleView.LIST,
};
const sequenceLoadingArgs = {
    ...loadingArgs,
    view: ArticleView.SEQUENCE,
};

export const DefaultGridView = Template.bind({});
DefaultGridView.args = gridArgs;
export const DefaultGridViewRedesigned = Template.bind({});
DefaultGridViewRedesigned.args = gridArgs;
DefaultGridViewRedesigned.decorators = [NewDesignDecorator];

export const DefaultListView = Template.bind({});
DefaultListView.args = listArgs;

export const DefaultSequenceViewRedesigned = Template.bind({});
DefaultSequenceViewRedesigned.args = sequenceArgs;
DefaultSequenceViewRedesigned.decorators = [NewDesignDecorator];

export const LoadingGridView = Template.bind({});
LoadingGridView.args = gridLoadingArgs;

export const LoadingGridViewRedesigned = Template.bind({});
LoadingGridViewRedesigned.args = gridLoadingArgs;
LoadingGridViewRedesigned.decorators = [NewDesignDecorator];

export const LoadingListView = Template.bind({});
LoadingListView.args = listLoadingArgs;

export const LoadingListViewRedesigned = Template.bind({});
LoadingListViewRedesigned.args = listLoadingArgs;
LoadingListViewRedesigned.decorators = [NewDesignDecorator];

export const LoadingSequenceViewRedesigned = Template.bind({});
LoadingSequenceViewRedesigned.args = sequenceLoadingArgs;
LoadingSequenceViewRedesigned.decorators = [NewDesignDecorator];
LoadingSequenceViewRedesigned.parameters = {
    loki: { skip: true },
};
