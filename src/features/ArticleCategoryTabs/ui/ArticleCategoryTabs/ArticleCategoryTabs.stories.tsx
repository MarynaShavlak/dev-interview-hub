import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleCategoryTabs } from './ArticleCategoryTabs';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ArticleCategory } from '@/entities/Article';

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
    value: ArticleCategory.IT,
};

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {
    value: ArticleCategory.ECONOMICS,
};
NormalRedesigned.decorators = [NewDesignDecorator];
