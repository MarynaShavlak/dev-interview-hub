import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleViewSelector } from './ArticleViewSelector';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ArticleView } from '@/entities/Article';

export default {
    title: 'features/ArticleViewSelector',
    component: ArticleViewSelector,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleViewSelector>;

const Template: ComponentStory<typeof ArticleViewSelector> = (args) => (
    <ArticleViewSelector {...args} />
);

export const GridViewSelected = Template.bind({});
GridViewSelected.args = {
    view: ArticleView.GRID,
};

export const GridViewSelectedRedesigned = Template.bind({});
GridViewSelectedRedesigned.args = {
    view: ArticleView.GRID,
};
GridViewSelectedRedesigned.decorators = [NewDesignDecorator];

export const ListViewSelected = Template.bind({});
ListViewSelected.args = {
    view: ArticleView.LIST,
};

export const ListViewRedesigned = Template.bind({});
ListViewRedesigned.args = {
    view: ArticleView.LIST,
};
ListViewRedesigned.decorators = [NewDesignDecorator];
