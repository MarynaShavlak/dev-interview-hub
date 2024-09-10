import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleCodeBlockComponent } from './ArticleCodeBlockComponent';
import { ArticleCodeBlock } from '../../model/types/article';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { testArticleData } from '../../testing';

export default {
    title: 'entities/Article/ArticleCodeBlockComponent',
    component: ArticleCodeBlockComponent,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleCodeBlockComponent>;

// Template function to be reused for all stories
const Template: ComponentStory<typeof ArticleCodeBlockComponent> = (args) => (
    <ArticleCodeBlockComponent {...args} />
);

export const CodeBlock = Template.bind({});
CodeBlock.args = {
    block: testArticleData.blocks[3] as ArticleCodeBlock,
};

export const CodeBlockRedesigned = Template.bind({});
CodeBlockRedesigned.args = {
    block: testArticleData.blocks[3] as ArticleCodeBlock,
};
CodeBlockRedesigned.decorators = [NewDesignDecorator];
