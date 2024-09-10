import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleTextBlockComponent } from './ArticleTextBlockComponent';
import { testArticleData } from '../../testing';
import { ArticleTextBlock } from '../../model/types/article';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Article/ArticleTextBlockComponent',
    component: ArticleTextBlockComponent,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleTextBlockComponent>;

const Template: ComponentStory<typeof ArticleTextBlockComponent> = (args) => (
    <ArticleTextBlockComponent {...args} />
);

export const WithTitle = Template.bind({});
WithTitle.args = {
    block: testArticleData.blocks[0] as ArticleTextBlock,
};

export const WithTitleRedesigned = Template.bind({});
WithTitleRedesigned.args = {
    block: testArticleData.blocks[0] as ArticleTextBlock,
};
WithTitleRedesigned.decorators = [NewDesignDecorator];

export const WithoutTitle = Template.bind({});
WithoutTitle.args = {
    block: testArticleData.blocks[1] as ArticleTextBlock,
};

export const WithoutTitleRedesigned = Template.bind({});
WithoutTitleRedesigned.args = {
    block: testArticleData.blocks[1] as ArticleTextBlock,
};
WithoutTitleRedesigned.decorators = [NewDesignDecorator];
