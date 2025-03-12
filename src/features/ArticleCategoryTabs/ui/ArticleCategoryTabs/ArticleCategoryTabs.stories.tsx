import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleCategoryTabs } from './ArticleCategoryTabs';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ArticleCategory, ArticleSortField } from '@/entities/Article';
import { AlgoliaSearchDecorator } from '@/shared/config/storybook/AlgoliaSearchDecorator/AlgoliaSearchDecorator';

export default {
    title: 'features/ArticleCategoryTabs',
    component: ArticleCategoryTabs,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleCategoryTabs>;

const Template: ComponentStory<typeof ArticleCategoryTabs> = (args) => (
    <ArticleCategoryTabs {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    value: ArticleCategory.REACT,
    onChangeCategory: (category: ArticleCategory) =>
        console.log(`Selected category: ${category}`),
};

export const WithNoSelection = Template.bind({});
WithNoSelection.args = {
    value: undefined as any,
    onChangeCategory: (category: ArticleCategory) =>
        console.log(`Selected category: ${category}`),
};

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {
    value: ArticleCategory.HTML,
};
NormalRedesigned.decorators = [
    (Story) => AlgoliaSearchDecorator(Story, ArticleSortField.TITLE_ASC),
    NewDesignDecorator,
];
