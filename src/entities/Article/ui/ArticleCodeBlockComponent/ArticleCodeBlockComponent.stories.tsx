import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleCodeBlockComponent } from './ArticleCodeBlockComponent';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { codeBlockWithNoTitle, codeBlockWithTitle } from '../../testing';

export default {
    title: 'entities/Article/ArticleCodeBlockComponent',
    component: ArticleCodeBlockComponent,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleCodeBlockComponent>;

const Template: ComponentStory<typeof ArticleCodeBlockComponent> = (args) => (
    <ArticleCodeBlockComponent {...args} />
);

export const WithTitle = Template.bind({});
WithTitle.args = { block: codeBlockWithTitle };

export const WithTitleRedesigned = Template.bind({});
WithTitleRedesigned.args = { block: codeBlockWithTitle };
WithTitleRedesigned.decorators = [NewDesignDecorator];

export const WithoutTitle = Template.bind({});
WithoutTitle.args = { block: codeBlockWithNoTitle };

export const WithoutTitleRedesigned = Template.bind({});
WithoutTitleRedesigned.args = { block: codeBlockWithNoTitle };
WithoutTitleRedesigned.decorators = [NewDesignDecorator];
