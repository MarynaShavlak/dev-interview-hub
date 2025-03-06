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
    page: 1,
};

const gridArgs = {
    ...defaultArgs,
    view: ArticleView.GRID,
};

const listArgs = {
    ...defaultArgs,
    view: ArticleView.LIST,
};
export const DefaultGridView = Template.bind({});
DefaultGridView.args = gridArgs;
export const DefaultGridViewRedesigned = Template.bind({});
DefaultGridViewRedesigned.args = gridArgs;
DefaultGridViewRedesigned.decorators = [NewDesignDecorator];

export const DefaultListView = Template.bind({});
DefaultListView.args = listArgs;

export const DefaultListViewRedesigned = Template.bind({});
DefaultListViewRedesigned.args = listArgs;
DefaultListViewRedesigned.decorators = [NewDesignDecorator];

// export const Grid = Template.bind({});
// Grid.args = {
//     articles: new Array(9).fill(0).map((item, index) => ({
//         ...testArticleData,
//         id: String(index),
//     })),
//     isLoading: false,
//     view: ArticleView.GRID,
// };

// export const NormalList = Template.bind({});
// NormalList.args = {
//     articles: new Array(9).fill(0).map((item, index) => ({
//         ...testArticleData,
//         id: String(index),
//     })),
//     isLoading: false,
//     view: ArticleView.LIST,
// };
//
// export const LoadingListRedesigned = Template.bind({});
// LoadingListRedesigned.args = {
//     articles: [],
//     isLoading: true,
//     view: ArticleView.LIST,
// };
// LoadingListRedesigned.decorators = [NewDesignDecorator];
//
// export const LoadingGridRedesigned = Template.bind({});
// LoadingGridRedesigned.args = {
//     articles: [],
//     isLoading: true,
//     view: ArticleView.GRID,
// };
// LoadingGridRedesigned.decorators = [NewDesignDecorator];
//
// export const NormalGridRedesigned = Template.bind({});
// NormalGridRedesigned.args = {
//     articles: new Array(9).fill(0).map((item, index) => ({
//         ...testArticleData,
//         id: String(index),
//     })),
//     isLoading: false,
//     view: ArticleView.GRID,
// };
// NormalGridRedesigned.decorators = [NewDesignDecorator];
//
// export const NormalListRedesigned = Template.bind({});
// NormalListRedesigned.args = {
//     articles: new Array(9).fill(0).map((item, index) => ({
//         ...testArticleData,
//         id: String(index),
//     })),
//     isLoading: false,
//     view: ArticleView.LIST,
// };
// NormalListRedesigned.decorators = [NewDesignDecorator];
//
//
// export const LoadingList = Template.bind({});
// LoadingList.args = {
//     articles: [],
//     isLoading: true,
//     view: ArticleView.LIST,
// };
//
// export const LoadingGrid = Template.bind({});
// LoadingGrid.args = {
//     articles: [],
//     isLoading: true,
//     view: ArticleView.GRID,
// };
