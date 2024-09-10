import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleView } from '../../model/consts/articleConsts';
import { ArticleCard } from './ArticleCard';
import { testArticleData } from '../../testing';
import { NewDesignDecorator } from '../../../../shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Article/ArticleCard',
    component: ArticleCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        article: testArticleData,
    },
} as ComponentMeta<typeof ArticleCard>;

const Template: ComponentStory<typeof ArticleCard> = (args) => (
    <ArticleCard {...args} />
);

export const GridView = Template.bind({});
GridView.args = {
    view: ArticleView.GRID,
    target: '_blank',
};

export const GridViewRedesigned = Template.bind({});
GridViewRedesigned.args = {
    view: ArticleView.GRID,
    target: '_blank',
};
GridViewRedesigned.decorators = [NewDesignDecorator];

export const ListView = Template.bind({});
ListView.args = {
    view: ArticleView.LIST,
};

export const ListViewRedesigned = Template.bind({});
ListViewRedesigned.args = {
    view: ArticleView.LIST,
};
ListViewRedesigned.decorators = [NewDesignDecorator];
