import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleTextBlockComponent } from './ArticleTextBlockComponent';
import {
    textBlockWithNoTitle,
    textBlockWithTags,
    textBlockWithTitleAndFewParagraphs,
} from '../../testing';
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

const withTagsArgs = {
    block: textBlockWithTags,
    withTags: true,
};
const noTagsArgs = {
    block: textBlockWithTags,
    withTags: false,
};

export const WithTitle = Template.bind({});
WithTitle.args = { block: textBlockWithTitleAndFewParagraphs };

export const WithTitleRedesigned = Template.bind({});
WithTitleRedesigned.args = { block: textBlockWithTitleAndFewParagraphs };
WithTitleRedesigned.decorators = [NewDesignDecorator];

export const WithoutTitle = Template.bind({});
WithoutTitle.args = { block: textBlockWithNoTitle };

export const WithoutTitleRedesigned = Template.bind({});
WithoutTitleRedesigned.args = { block: textBlockWithNoTitle };
WithoutTitleRedesigned.decorators = [NewDesignDecorator];

export const WithTagsEnabled = Template.bind({});
WithTagsEnabled.args = withTagsArgs;
export const WithTagsEnabledRedesigned = Template.bind({});
WithTagsEnabledRedesigned.args = withTagsArgs;
WithTagsEnabledRedesigned.decorators = [NewDesignDecorator];

export const WithTagsDisabled = Template.bind({});
WithTagsDisabled.args = noTagsArgs;

export const WithTagsDisabledRedesigned = Template.bind({});
WithTagsDisabledRedesigned.args = noTagsArgs;
WithTagsDisabledRedesigned.decorators = [NewDesignDecorator];
