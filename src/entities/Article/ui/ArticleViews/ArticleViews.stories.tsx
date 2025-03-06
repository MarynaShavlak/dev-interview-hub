import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleViews } from './ArticleViews';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Article/ArticleViews',
    component: ArticleViews,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleViews>;

const Template: ComponentStory<typeof ArticleViews> = (args) => (
    <ArticleViews {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    views: 207,
};

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {
    views: 445346,
};
NormalRedesigned.decorators = [NewDesignDecorator];
