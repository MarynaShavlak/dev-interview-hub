import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleImageBlockComponent } from './ArticleImageBlockComponent';
import { ArticleImageBlock } from '../../model/types/article';
import { testArticleData } from '../../testing';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Article/ArticleImageBlockComponent',
    component: ArticleImageBlockComponent,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleImageBlockComponent>;

const Template: ComponentStory<typeof ArticleImageBlockComponent> = (args) => (
    <ArticleImageBlockComponent {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    block: testArticleData.blocks[2] as ArticleImageBlock,
};

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {
    block: testArticleData.blocks[2] as ArticleImageBlock,
};
NormalRedesigned.decorators = [NewDesignDecorator];
