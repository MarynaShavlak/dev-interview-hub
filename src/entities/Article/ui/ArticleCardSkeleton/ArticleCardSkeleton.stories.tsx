import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleCardSkeleton } from './ArticleCardSkeleton';
import { ArticleView } from '../../model/consts/articleConsts';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Article/ArticleCardSkeleton',
    component: ArticleCardSkeleton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleCardSkeleton>;

const Template: ComponentStory<typeof ArticleCardSkeleton> = (args) => (
    <ArticleCardSkeleton {...args} />
);

export const ListViewSkeleton = Template.bind({});
ListViewSkeleton.args = {
    view: ArticleView.LIST,
};

export const ListViewSkeletonRedesigned = Template.bind({});
ListViewSkeletonRedesigned.args = {
    view: ArticleView.LIST,
};
ListViewSkeletonRedesigned.decorators = [NewDesignDecorator];

export const GridViewSkeleton = Template.bind({});
GridViewSkeleton.args = {
    view: ArticleView.GRID,
};

export const GridViewSkeletonRedesigned = Template.bind({});
GridViewSkeletonRedesigned.args = {
    view: ArticleView.GRID,
};
GridViewSkeletonRedesigned.decorators = [NewDesignDecorator];
