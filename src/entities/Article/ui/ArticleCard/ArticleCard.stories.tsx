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
const gridArgs = {
    view: ArticleView.GRID,
    target: '_blank',
};
const listArgs = {
    view: ArticleView.LIST,
};
const sequenceArgs = {
    view: ArticleView.SEQUENCE,
    index: 0,
    page: 1,
};

export const GridView = Template.bind({});
GridView.args = gridArgs;

export const GridViewRedesigned = Template.bind({});
GridViewRedesigned.args = gridArgs;
GridViewRedesigned.decorators = [NewDesignDecorator];

export const ListView = Template.bind({});
ListView.args = listArgs;

export const ListViewRedesigned = Template.bind({});
ListViewRedesigned.args = listArgs;
ListViewRedesigned.decorators = [NewDesignDecorator];

export const SequenceViewRedesigned = Template.bind({});
SequenceViewRedesigned.args = sequenceArgs;
SequenceViewRedesigned.decorators = [NewDesignDecorator];
