import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleView } from '../../model/consts/articleConsts';

import { ArticleList } from './ArticleList';
import { testArticleData } from '../../testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Article/ArticleList',
    component: ArticleList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleList>;

const Template: ComponentStory<typeof ArticleList> = (args) => (
    <ArticleList {...args} />
);

export const LoadingList = Template.bind({});
LoadingList.args = {
    articles: [],
    isLoading: true,
    view: ArticleView.LIST,
};

export const LoadingGrid = Template.bind({});
LoadingGrid.args = {
    articles: [],
    isLoading: true,
    view: ArticleView.GRID,
};

export const NormalGrid = Template.bind({});
NormalGrid.args = {
    articles: new Array(9).fill(0).map((item, index) => ({
        ...testArticleData,
        id: String(index),
    })),
    isLoading: false,
    view: ArticleView.GRID,
};

export const NormalList = Template.bind({});
NormalList.args = {
    articles: new Array(9).fill(0).map((item, index) => ({
        ...testArticleData,
        id: String(index),
    })),
    isLoading: false,
    view: ArticleView.LIST,
};

export const LoadingListRedesigned = Template.bind({});
LoadingListRedesigned.args = {
    articles: [],
    isLoading: true,
    view: ArticleView.LIST,
};
LoadingListRedesigned.decorators = [NewDesignDecorator];

export const LoadingGridRedesigned = Template.bind({});
LoadingGridRedesigned.args = {
    articles: [],
    isLoading: true,
    view: ArticleView.GRID,
};
LoadingGridRedesigned.decorators = [NewDesignDecorator];

export const NormalGridRedesigned = Template.bind({});
NormalGridRedesigned.args = {
    articles: new Array(9).fill(0).map((item, index) => ({
        ...testArticleData,
        id: String(index),
    })),
    isLoading: false,
    view: ArticleView.GRID,
};
NormalGridRedesigned.decorators = [NewDesignDecorator];

export const NormalListRedesigned = Template.bind({});
NormalListRedesigned.args = {
    articles: new Array(9).fill(0).map((item, index) => ({
        ...testArticleData,
        id: String(index),
    })),
    isLoading: false,
    view: ArticleView.LIST,
};
NormalListRedesigned.decorators = [NewDesignDecorator];
